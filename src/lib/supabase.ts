import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let adminClient: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;
  adminClient = createClient(env.supabase.url(), env.supabase.serviceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}

export type UserRow = {
  id: string;
  x_user_id: string;
  x_handle: string;
  x_access_token: string;
  x_refresh_token: string;
  x_token_expires_at: string;
  phone_e164: string | null;
  phone_verified_at: string | null;
  is_active: boolean;
  created_at: string;
};

export type TweetLogRow = {
  id: string;
  user_id: string;
  tweet_id: string | null;
  body: string;
  status: "posted" | "failed" | "rate_limited" | "blocked";
  error: string | null;
  created_at: string;
};
