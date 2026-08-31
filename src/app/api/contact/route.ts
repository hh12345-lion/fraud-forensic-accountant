import { NextRequest, NextResponse } from "next/server";
import {
  appendContactToSheet,
  writeSubmissionToSheetSafely,
} from "@/lib/sheetSubmissions";
import { sanitizeLeadText, type LeadSubmission } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<LeadSubmission> & {
      skipSheet?: boolean;
    };
    const skipSheet = body.skipSheet === true;

    const fullName = sanitizeLeadText(body.fullName ?? "", 200);
    const email = sanitizeLeadText(body.email ?? "", 320).toLowerCase();
    const message = sanitizeLeadText(body.message ?? "", 4000);

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
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
      phone: sanitizeLeadText(body.phone ?? "", 50),
      organization: sanitizeLeadText(body.organization ?? "", 200),
      role: sanitizeLeadText(body.role ?? "", 120),
      caseCategory: sanitizeLeadText(body.caseCategory ?? "", 120),
      fraudType: sanitizeLeadText(body.fraudType ?? "", 120),
      fraudValue: sanitizeLeadText(body.fraudValue ?? "", 80),
      urgent: sanitizeLeadText(body.urgent ?? "", 80),
      message,
    };

    const writtenToSheet = skipSheet
      ? false
      : await writeSubmissionToSheetSafely(
          () => appendContactToSheet(lead),
          "contact"
        );

    console.log("Contact submission received:", {
      fullName: lead.fullName,
      email: lead.email,
      formType: "Contact",
      writtenToSheet,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry logged securely.",
      writtenToSheet,
    });
  } catch (error) {
    console.error("contact error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
