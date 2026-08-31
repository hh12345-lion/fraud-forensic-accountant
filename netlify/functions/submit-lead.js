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

function normalizePrivateKey(raw) {
  if (!raw) return undefined;
  let key = String(raw).trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}

function isGoogleSheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID
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
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = (process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1").trim();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:N`,
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
  const message = typeof body.message === "string" ? body.message.trim() : "";
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
        tab: (process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1").trim(),
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
