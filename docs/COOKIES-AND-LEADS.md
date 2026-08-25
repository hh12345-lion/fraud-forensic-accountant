# Cookie consent & lead capture

## Cookie consent

- Provider: `src/components/cookies/CookieConsentProvider.tsx`
- Storage: `localStorage` key `ffa_cookie_consent_v1`, 12-month expiry
- Google Consent Mode v2 defaults to **denied** in `layout.tsx` before any tag loads
- Tracking scripts load only after consent via `TrackingScripts.tsx`

### Public env vars (optional)

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=
NEXT_PUBLIC_HOTJAR_ID=
```

### User actions

- **Accept All** / **Reject Non-Essential** / **Customize Preferences**
- **Cookie Settings** in the footer reopens the modal anytime

Policy: `/cookies`

---

## Contact form & leads

See **`Lead_notification_setup.md`** for the full cross-project spec.

### Flow

1. User submits `/contact` form
2. Browser `POST /api/submit-lead` with `fullName`, `email`, `phone`, `formType: "contact"`, and `message`
3. Server `POST`s to **`Lead_notification_url`** (n8n) with five fixed keys: `Full Name`, `Email`, `Phone Number`, `Brand name`, `domain`

### Environment variables

```
Lead_notification_url=
NEXT_PUBLIC_SITE_URL=https://www.fraudforensicaccountant.com
```

Optional Google Sheets vars apply to **instruct** submissions only (when `/api/instruct` exists), not the contact form.

**Never commit real URLs or keys to Git.**

### Netlify

- **`netlify.toml`**: `/api/submit-lead` → `/.netlify/functions/submit-lead`
- Local testing: `netlify dev` (often `http://localhost:8888`)

### Company email

Displayed on the contact form: `contact@fraudforensicaccountant.com`
