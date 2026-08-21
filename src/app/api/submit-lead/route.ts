import { NextRequest, NextResponse } from "next/server";
import { appendRow } from "@/lib/google-sheets";
import { leadToSheetRow, sanitizeLeadText, type LeadSubmission } from "@/lib/leads";
import { SITE_EMAIL } from "@/lib/site";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<LeadSubmission>;

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

    try {
      await appendRow(leadToSheetRow(lead));
    } catch (err) {
      console.error("Google Sheets write failed:", err);
      return NextResponse.json(
        {
          success: false,
          error: `Unable to save submission. Please email ${SITE_EMAIL}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
