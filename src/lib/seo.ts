import { SITE_URL } from "./site";

export function getSiteDomain(): string {
  try {
    const hostname = new URL(SITE_URL).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return "fraudforensicaccountant.com";
  }
}
