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
