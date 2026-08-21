import { SITE_EMAIL } from "./site";

export const BRAND_NAME = "Fraud Forensic Accountant";

export type LeadSubmission = {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  role?: string;
  caseCategory?: string;
  fraudType?: string;
  fraudValue?: string;
  urgent?: string;
  message?: string;
};

export function sanitizeLeadText(value: string, max = 2000): string {
  return value.replace(/<[^>]*>/g, "").trim().slice(0, max);
}

export function leadToSheetRow(lead: LeadSubmission): (string | null)[] {
  return [
    new Date().toISOString(),
    BRAND_NAME,
    lead.fullName,
    lead.email.toLowerCase(),
    lead.phone || "",
    lead.organization || "",
    lead.role || "",
    lead.caseCategory || "",
    lead.fraudType || "",
    lead.fraudValue || "",
    lead.urgent || "",
    lead.message || "",
    SITE_EMAIL,
  ];
}
