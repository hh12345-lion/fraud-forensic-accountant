import { google, sheets_v4 } from "googleapis";

export type CellValue = string | number | boolean | null;

export interface SheetTarget {
  spreadsheetId?: string;
  sheetName?: string;
}

export interface AppendResult {
  success: boolean;
  updatedRange?: string | null;
}

/** Default tab when GOOGLE_SHEET_TAB_NAME is unset (matches Netlify). */
export const DEFAULT_SHEET_TAB_NAME = "Fraud Forensic Accountant";

function trimEnvQuotes(value: string | undefined): string | undefined {
  if (value == null) return undefined;
  let v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v || undefined;
}

/** Accepts raw ID or a full `docs.google.com/spreadsheets/d/...` URL. */
export function normalizeSpreadsheetId(
  raw: string | undefined
): string | undefined {
  const trimmed = trimEnvQuotes(raw);
  if (!trimmed) return undefined;
  const fromUrl = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (fromUrl?.[1]) return fromUrl[1];
  return trimmed;
}

function normalizePrivateKey(raw: string | undefined): string | undefined {
  const trimmed = trimEnvQuotes(raw);
  if (!trimmed) return undefined;

  // Netlify: literal \n, double-escaped \\n, or real newlines.
  let key = trimmed;
  for (let i = 0; i < 3 && key.includes("\\n"); i += 1) {
    key = key.replace(/\\n/g, "\n");
  }
  key = key.trim();

  // PEM pasted as one line (common in hosting env UIs).
  if (key.includes("BEGIN PRIVATE KEY") && !key.includes("\n")) {
    key = key
      .replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n")
      .replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----");
  }

  return key.includes("BEGIN PRIVATE KEY") ? key : undefined;
}

function resolveSheetTabName(override?: string): string {
  const raw =
    trimEnvQuotes(override || process.env.GOOGLE_SHEET_TAB_NAME) ||
    DEFAULT_SHEET_TAB_NAME;
  return raw.replace(/\s+/g, " ").trim();
}

/** A1 range for append; quotes tab names with spaces/special chars. */
function appendRangeForTab(sheetName: string): string {
  const name = sheetName || DEFAULT_SHEET_TAB_NAME;
  if (/^[A-Za-z0-9_]+$/.test(name)) return `${name}!A:A`;
  return `'${name.replace(/'/g, "''")}'!A:A`;
}

function getAuthClient() {
  const email = trimEnvQuotes(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  const key = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!email || !key) {
    throw new Error("Google Sheets credentials are not configured");
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetsClient(): sheets_v4.Sheets {
  return google.sheets({ version: "v4", auth: getAuthClient() });
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(
    trimEnvQuotes(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) &&
      normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY) &&
      normalizeSpreadsheetId(process.env.GOOGLE_SHEET_ID)
  );
}

function resolveTarget(target?: SheetTarget) {
  const spreadsheetId = normalizeSpreadsheetId(
    target?.spreadsheetId || process.env.GOOGLE_SHEET_ID
  );
  const sheetName = resolveSheetTabName(target?.sheetName);

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured");
  }

  return { spreadsheetId, sheetName };
}

export async function appendRow(
  values: CellValue[],
  target?: SheetTarget
): Promise<AppendResult> {
  const { spreadsheetId, sheetName } = resolveTarget(target);
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: appendRangeForTab(sheetName),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });

  return {
    success: true,
    updatedRange: response.data.updates?.updatedRange,
  };
}

export async function appendRowWithRetry(
  values: CellValue[],
  maxRetries = 2,
  target?: SheetTarget
): Promise<AppendResult> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await appendRow(values, target);
    } catch (error: unknown) {
      const err = error as { code?: number };
      const isRetryable =
        err?.code === 429 || err?.code === 503 || err?.code === 500;

      if (isRetryable && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}
