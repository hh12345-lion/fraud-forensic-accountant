import { NextRequest, NextResponse } from "next/server";
import { notifyLeadWebhook } from "@/lib/leadNotification";
import { sanitizeLeadText, type LeadSubmission } from "@/lib/leads";
import {
  appendContactToSheet,
  appendInstructToSheet,
  writeSubmissionToSheetSafely,
} from "@/lib/sheetSubmissions";

/**
 * POST /api/submit-lead
 * Webhook + soft-fail Sheets. Live /api/contact and /api/instruct return 404
 * on Netlify, and the old force-redirect to the Netlify function skipped Sheets.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<LeadSubmission> & {
      formType?: string;
      organisation?: string;
      skipSheet?: boolean;
      Message?: string;
      description?: string;
      enquiry?: string;
      details?: string;
      summary?: string;
      notes?: string;
      matter?: string;
    };

    const fullName = sanitizeLeadText(body.fullName ?? "", 200);
    const email = sanitizeLeadText(body.email ?? "", 320).toLowerCase();
    const phone = sanitizeLeadText(body.phone ?? "", 50);
    const formType = body.formType === "instruct" ? "instruct" : "contact";
    const skipSheet = body.skipSheet === true;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "fullName and email are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const lead: LeadSubmission = {
      fullName,
      email,
      phone,
      organization: sanitizeLeadText(
        body.organization ?? body.organisation ?? "",
        200
      ),
      role: sanitizeLeadText(body.role ?? "", 120),
      caseCategory: sanitizeLeadText(body.caseCategory ?? "", 120),
      fraudType: sanitizeLeadText(body.fraudType ?? "", 120),
      fraudValue: sanitizeLeadText(body.fraudValue ?? "", 80),
      urgent: sanitizeLeadText(body.urgent ?? "", 80),
      message: sanitizeLeadText(
        body.message ??
          body.Message ??
          body.description ??
          body.enquiry ??
          body.details ??
          body.summary ??
          body.notes ??
          body.matter ??
          "",
        4000
      ),
    };

    const result = await notifyLeadWebhook({
      fullName,
      email,
      phone,
      message: lead.message,
    });

    const writtenToSheet = skipSheet
      ? false
      : await writeSubmissionToSheetSafely(
          () =>
            formType === "instruct"
              ? appendInstructToSheet(lead)
              : appendContactToSheet(lead),
          `submit-lead-${formType}`
        );

    if (!result.ok && !writtenToSheet) {
      return NextResponse.json(
        { success: false, error: "Lead notification dispatch failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      forwarded: result.forwarded,
      writtenToSheet,
    });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
