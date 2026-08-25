import { NextRequest, NextResponse } from "next/server";
import { notifyLeadWebhook } from "@/lib/leadNotification";
import { sanitizeLeadText } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      phone?: string;
      formType?: string;
      message?: string;
    };

    const fullName = sanitizeLeadText(body.fullName ?? "", 200);
    const email = sanitizeLeadText(body.email ?? "", 320).toLowerCase();
    const phone = sanitizeLeadText(body.phone ?? "", 50);
    const message = sanitizeLeadText(body.message ?? "", 4000);

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

    if (body.formType === "contact" && !message) {
      return NextResponse.json(
        { success: false, error: "message is required" },
        { status: 400 }
      );
    }

    const result = await notifyLeadWebhook({ fullName, email, phone });

    if (message) {
      console.log("Contact message:", { fullName, email, formType: body.formType, message });
    }

    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: "Lead notification dispatch failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, forwarded: result.forwarded });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
