const { google } = require("googleapis");

const BRAND_NAME = "Fraud Forensic Accountant";

function getLeadWebhookUrl() {
  return (
    process.env.Lead_notification_url ||
    process.env.LEAD_NOTIFICATION_URL ||
    ""
  );
}

function getSiteDomain() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.fraudforensicaccountant.com";
  try {
    const hostname = new URL(siteUrl).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return "fraudforensicaccountant.com";
  }
}

function trimEnvQuotes(value) {
  if (value == null) return undefined;
  let v = String(value).trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v || undefined;
}

function normalizeSpreadsheetId(raw) {
  const trimmed = trimEnvQuotes(raw);
  if (!trimmed) return undefined;
  const fromUrl = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (fromUrl && fromUrl[1]) return fromUrl[1];
  return trimmed;
}

function normalizePrivateKey(raw) {
  const trimmed = trimEnvQuotes(raw);
  if (!trimmed) return undefined;
  let key = trimmed;
  for (let i = 0; i < 3 && key.includes("\\n"); i += 1) {
    key = key.replace(/\\n/g, "\n");
  }
  key = key.trim();
  if (key.includes("BEGIN PRIVATE KEY") && !key.includes("\n")) {
    key = key
      .replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n")
      .replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----");
  }
  return key.includes("BEGIN PRIVATE KEY") ? key : undefined;
}

function appendRangeForTab(sheetName) {
  const name = sheetName || "Fraud Forensic Accountant";
  if (/^[A-Za-z0-9_]+$/.test(name)) return `${name}!A:N`;
  return `'${name.replace(/'/g, "''")}'!A:N`;
}

function isGoogleSheetsConfigured() {
  return Boolean(
    trimEnvQuotes(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) &&
      normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY) &&
      normalizeSpreadsheetId(process.env.GOOGLE_SHEET_ID)
  );
}

function sanitize(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

async function appendLeadToSheet(payload) {
  if (!isGoogleSheetsConfigured()) {
    console.warn("[submit-lead fn] Sheets not configured — skip");
    return false;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: trimEnvQuotes(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
      private_key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = normalizeSpreadsheetId(process.env.GOOGLE_SHEET_ID);
  const sheetName = (
    trimEnvQuotes(process.env.GOOGLE_SHEET_TAB_NAME) ||
    "Fraud Forensic Accountant"
  )
    .replace(/\s+/g, " ")
    .trim();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: appendRangeForTab(sheetName),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          BRAND_NAME,
          payload.formType === "instruct" ? "Instruct" : "Contact",
          sanitize(payload.fullName),
          String(payload.email || "").toLowerCase().trim(),
          sanitize(payload.phone),
          sanitize(payload.organization),
          "",
          "",
          "",
          "",
          "",
          sanitize(payload.message),
          process.env.NEXT_PUBLIC_SITE_EMAIL || "",
        ],
      ],
    },
  });

  return true;
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON body" }),
    };
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const formType = body.formType === "instruct" ? "instruct" : "contact";
  const organization =
    typeof body.organization === "string"
      ? body.organization.trim()
      : typeof body.organisation === "string"
        ? body.organisation.trim()
        : "";
  const message = (() => {
    const keys = [
      "message",
      "Message",
      "description",
      "enquiry",
      "details",
      "summary",
      "notes",
      "matter",
    ];
    for (const key of keys) {
      if (body[key] != null && String(body[key]).trim()) {
        return String(body[key]).trim();
      }
    }
    return "";
  })();
  const skipSheet = body.skipSheet === true;

  if (!fullName || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "fullName and email are required" }),
    };
  }

  let forwarded = false;
  let webhookOk = true;
  const webhookUrl = getLeadWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      "Lead_notification_url not configured — lead logged but not forwarded."
    );
    console.log("Lead submission:", {
      fullName,
      email,
      phone,
      brand: BRAND_NAME,
      domain: getSiteDomain(),
    });
  } else {
    const outbound = {
      "Full Name": fullName,
      Email: email,
      "Phone Number": phone,
      "Brand name": BRAND_NAME,
      domain: getSiteDomain(),
      message,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outbound),
      });
      if (!response.ok) {
        console.error(
          "Webhook POST failed:",
          response.status,
          await response.text()
        );
        webhookOk = false;
      } else {
        forwarded = true;
      }
    } catch (err) {
      console.error("Webhook POST error:", err);
      webhookOk = false;
    }
  }

  let writtenToSheet = false;
  if (!skipSheet) {
    try {
      writtenToSheet = await appendLeadToSheet({
        fullName,
        email,
        phone,
        formType,
        organization,
        message,
      });
    } catch (err) {
      console.error("Google Sheets error (submit-lead fn):", {
        message: err && err.message,
        spreadsheetId: process.env.GOOGLE_SHEET_ID
          ? `${process.env.GOOGLE_SHEET_ID.slice(0, 8)}...`
          : "missing",
        tab: (
          process.env.GOOGLE_SHEET_TAB_NAME || "Fraud Forensic Accountant"
        )
          .replace(/\s+/g, " ")
          .trim(),
      });
      writtenToSheet = false;
    }
  }

  if (!webhookOk && !writtenToSheet) {
    return {
      statusCode: 502,
      body: JSON.stringify({ message: "Lead notification dispatch failed" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      forwarded,
      writtenToSheet,
    }),
  };
};
