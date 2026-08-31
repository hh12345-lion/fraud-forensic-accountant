import {
  appendRowWithRetry,
  isGoogleSheetsConfigured,
  type SheetTarget,
} from "@/lib/google-sheets";
import {
  BRAND_NAME,
  sanitizeLeadText,
  type LeadSubmission,
} from "@/lib/leads";
import { SITE_EMAIL } from "@/lib/site";

function sharedTab(): SheetTarget {
  return {
    sheetName: (process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1").trim(),
  };
}

/**
 * Expected header row (one shared tab):
 * Timestamp | Brand | Form Type | Full Name | Email | Phone | Organisation | Role |
 * Case Category | Fraud Type | Fraud Value | Urgent | Message | Site Email
 */
function buildSheetRow(
  lead: LeadSubmission,
  formType: "Contact" | "Instruct"
): (string | null)[] {
  return [
    new Date().toISOString(),
    BRAND_NAME,
    formType,
    sanitizeLeadText(lead.fullName, 200),
    lead.email.toLowerCase().trim(),
    sanitizeLeadText(lead.phone ?? "", 50),
    sanitizeLeadText(lead.organization ?? "", 200),
    sanitizeLeadText(lead.role ?? "", 120),
    sanitizeLeadText(lead.caseCategory ?? "", 120),
    sanitizeLeadText(lead.fraudType ?? "", 120),
    sanitizeLeadText(lead.fraudValue ?? "", 80),
    sanitizeLeadText(lead.urgent ?? "", 80),
    sanitizeLeadText(lead.message ?? "", 4000),
    SITE_EMAIL,
  ];
}

export async function appendContactToSheet(lead: LeadSubmission): Promise<void> {
  if (!isGoogleSheetsConfigured()) return;
  await appendRowWithRetry(buildSheetRow(lead, "Contact"), 2, sharedTab());
}

export async function appendInstructToSheet(lead: LeadSubmission): Promise<void> {
  if (!isGoogleSheetsConfigured()) return;
  await appendRowWithRetry(buildSheetRow(lead, "Instruct"), 2, sharedTab());
}

/** Soft-fail wrapper. Returns whether a row was written. */
export async function writeSubmissionToSheetSafely(
  writer: () => Promise<void>,
  context: string
): Promise<boolean> {
  if (!isGoogleSheetsConfigured()) {
    console.warn(`[sheets] not configured — skip (${context})`);
    return false;
  }

  try {
    await writer();
    return true;
  } catch (error: unknown) {
    const err = error as {
      message?: string;
      code?: number;
      response?: { status?: number };
    };
    console.error("Google Sheets error:", {
      context,
      message: err?.message,
      code: err?.code,
      status: err?.response?.status,
      spreadsheetId: process.env.GOOGLE_SHEET_ID
        ? `${process.env.GOOGLE_SHEET_ID.slice(0, 8)}...`
        : "missing",
      tab: (process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1").trim(),
      timestamp: new Date().toISOString(),
    });
    return false;
  }
}
