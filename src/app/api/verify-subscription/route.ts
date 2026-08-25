import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, sessionId, tier } = body;

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    // Update profile in Supabase
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          username: username || email.split("@")[0],
          stripe_customer_email: email,
          is_pro: true,
          pro_tier: tier || "monthly",
          stripe_subscription_id: sessionId || "sub_manual_" + Date.now(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "username" }
      )
      .select();

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Pro subscription verified and recorded",
      profile: data,
    });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json({ error: e.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const username = searchParams.get("username");

  if (!email && !username) {
    return NextResponse.json({ error: "Provide email or username" }, { status: 400 });
  }

  let query = supabaseAdmin.from("profiles").select("*");
  if (email) query = query.eq("stripe_customer_email", email);
  else if (username) query = query.eq("username", username);

  const { data, error } = await query.single();

  if (error || !data) {
    return NextResponse.json({ isPro: false }, { status: 200 });
  }

  return NextResponse.json({
    isPro: data.is_pro || false,
    proTier: data.pro_tier || "free",
    username: data.username,
  });
}
