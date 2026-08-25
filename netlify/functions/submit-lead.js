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

  if (!fullName || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "fullName and email are required" }),
    };
  }

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
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, forwarded: false }),
    };
  }

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
      console.error("Webhook POST failed:", response.status, await response.text());
      return {
        statusCode: 502,
        body: JSON.stringify({ message: "Lead notification dispatch failed" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, forwarded: true }),
    };
  } catch (error) {
    console.error("Webhook POST error:", error);
    return {
      statusCode: 502,
      body: JSON.stringify({ message: "Lead notification dispatch failed" }),
    };
  }
};
