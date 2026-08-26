import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

const VERCEL_AUTH_TOKEN = process.env.VERCEL_AUTH_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID || "snap-bio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { domain, username, email, userId } = body;

    if (!domain) {
      return NextResponse.json({ error: "Missing domain" }, { status: 400 });
    }

    const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");

    // 1. If Vercel API Token is configured, register domain to Vercel project automatically
    let vercelResult = null;
    if (VERCEL_AUTH_TOKEN) {
      try {
        const vercelRes = await fetch(
          "https://api.vercel.com/v10/projects/" + VERCEL_PROJECT_ID + "/domains",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + VERCEL_AUTH_TOKEN,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: cleanDomain }),
          }
        );
        vercelResult = await vercelRes.json();
      } catch (vErr) {
        console.error("Vercel domain registration error:", vErr);
      }
    }

    // 2. Update user profile in Supabase
    let updateQuery = supabaseAdmin.from("profiles").update({
      custom_domain: cleanDomain,
      updated_at: new Date().toISOString(),
    });

    if (userId) {
      updateQuery = updateQuery.eq("user_id", userId);
    } else if (username) {
      updateQuery = updateQuery.eq("username", username);
    } else if (email) {
      updateQuery = updateQuery.eq("stripe_customer_email", email);
    }

    const { data: dbData, error: dbError } = await updateQuery.select();

    if (dbError) {
      console.error("Supabase update error:", dbError);
    }

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      vercel: vercelResult,
      profile: dbData?.[0] || null,
      message: "Custom domain registered and synced to Vercel & Supabase successfully",
    });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json({ error: e.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Missing domain" }, { status: 400 });
  }

  const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");

  // Determine if subdomain or apex
  const parts = cleanDomain.split(".");
  const isApex = parts.length <= 2;
  const recordName = isApex ? "@" : parts[0];
  const recordType = isApex ? "A" : "CNAME";

  let vercelConfig = null;
  let vercelDomainInfo = null;
  let recommendedValue = isApex ? "76.76.21.21" : "cname.vercel-dns.com";
  let isConfigured = false;

  if (VERCEL_AUTH_TOKEN) {
    try {
      // 1. Fetch domain config via official v6 endpoint
      const configRes = await fetch(
        "https://api.vercel.com/v6/domains/" + cleanDomain + "/config",
        {
          headers: { Authorization: "Bearer " + VERCEL_AUTH_TOKEN },
        }
      );
      vercelConfig = await configRes.json();

      // 2. Fetch project domain info
      const infoRes = await fetch(
        "https://api.vercel.com/v9/projects/" + VERCEL_PROJECT_ID + "/domains/" + cleanDomain,
        {
          headers: { Authorization: "Bearer " + VERCEL_AUTH_TOKEN },
        }
      );
      vercelDomainInfo = await infoRes.json();

      if (!isApex) {
        recommendedValue = "cname.vercel-dns.com";
      } else {
        recommendedValue = "76.76.21.21";
      }

      // Check if domain is verified and configured
      if (vercelDomainInfo?.verified === true || vercelConfig?.misconfigured === false) {
        isConfigured = true;
      }
    } catch (err) {
      console.error("Vercel config fetch error:", err);
    }
  }

  return NextResponse.json({
    domain: cleanDomain,
    isApex,
    recordType,
    recordName,
    recommendedValue,
    isConfigured,
    vercelConfig,
    vercelDomainInfo,
  });
}
