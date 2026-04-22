function required(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `Missing environment variable ${name}. See .env.example for the full list.`,
    );
  }
  return v;
}

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  sessionSecret: () => required("SESSION_SECRET"),
  x: {
    clientId: () => required("X_CLIENT_ID"),
    clientSecret: () => required("X_CLIENT_SECRET"),
  },
  twilio: {
    accountSid: () => required("TWILIO_ACCOUNT_SID"),
    authToken: () => required("TWILIO_AUTH_TOKEN"),
    phoneNumber: () => required("TWILIO_PHONE_NUMBER"),
  },
  supabase: {
    url: () => required("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: () => required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    serviceRoleKey: () => required("SUPABASE_SERVICE_ROLE_KEY"),
  },
};

export function xRedirectUri(): string {
  return `${env.appUrl.replace(/\/$/, "")}/api/auth/x/callback`;
}
