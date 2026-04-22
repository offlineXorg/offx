// Target countries: the 5 places where people need an SMS-to-X bridge most.
// Picked from Access Now / KeepItOn shutdown reports (2023-2026) + ongoing
// X bans. This list drives the landing "Built for" section and the /connect
// country picker.
//
// "status" semantics:
//   - "live"         : a local SMS gateway number is already provisioned
//   - "international": users can reach us via the US number (intl SMS rates)
//   - "blocked"      : Twilio cannot currently sell numbers for this country
//                      (sanctions / suspended), so we can only receive SMS
//                      from networks that allow outbound intl SMS. Honest flag.

export type CountryStatus = "live" | "international" | "blocked";

export type TargetCountry = {
  iso: string; // ISO 3166-1 alpha-2
  name: string;
  flag: string; // emoji
  dial: string; // e.g. "+98"
  context: string; // one-line reason they're on this list
  status: CountryStatus;
};

export const TARGET_COUNTRIES: TargetCountry[] = [
  {
    iso: "IR",
    name: "Iran",
    flag: "🇮🇷",
    dial: "+98",
    context: "Rolling shutdowns during 2022 and 2026 protests. X blocked for years.",
    status: "blocked",
  },
  {
    iso: "MM",
    name: "Myanmar",
    flag: "🇲🇲",
    dial: "+95",
    context: "Junta-imposed blackouts since the 2021 coup. The most-shutdown country on earth.",
    status: "blocked",
  },
  {
    iso: "SD",
    name: "Sudan",
    flag: "🇸🇩",
    dial: "+249",
    context: "Months of blackouts since the civil war started in 2023.",
    status: "blocked",
  },
  {
    iso: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    dial: "+92",
    context: "X blocked nationwide since February 2024.",
    status: "international",
  },
  {
    iso: "PS",
    name: "Palestine (Gaza & West Bank)",
    flag: "🇵🇸",
    dial: "+970",
    context: "Repeated communications blackouts across Gaza since late 2023.",
    status: "blocked",
  },
];

// Active SMS gateway numbers. As the $OFFX token funds API budget we buy
// more. For now everything routes through the US long-code, which can
// receive international SMS from any network that allows outbound intl.
//
// Note: Twilio does not currently sell SMS-capable numbers for any of the
// five target countries (sanctions / carrier suspension), so the global
// US gateway is the realistic MVP plan. Local numbers roll out later.
export type SmsGateway = {
  label: string;
  e164: string;
  covers: string[]; // ISO codes that should see this as their primary number
  note?: string;
};

export const SMS_GATEWAYS: SmsGateway[] = [
  {
    label: "Global (United States)",
    e164: "+1 978 310 3688",
    covers: TARGET_COUNTRIES.map((c) => c.iso),
    note: "Send a normal SMS. International rates from your carrier apply.",
  },
];

export function primaryGatewayFor(iso: string): SmsGateway {
  return SMS_GATEWAYS.find((g) => g.covers.includes(iso)) ?? SMS_GATEWAYS[0];
}
