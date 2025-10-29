import { NextRequest, NextResponse } from "next/server";
import type { BuildPromptRequest, BuildPromptResponse } from "../../../types/database";

// ---- IMPORTANT FOR VERCEL ----
// Keep this route on the Node runtime (NOT Edge) so env secrets stay server-side.
export const runtime = "nodejs";

// (Optional) If you previously did static export, this ensures the route is dynamic.
export const dynamic = "force-dynamic";

// Small helper to always attach CORS headers (useful if your UI ever lives on another origin)
function withCORS(res: NextResponse, origin = "*") {
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

// Architect/system prompt (shortened here—plug in your full V3 if you want)
const SYSTEM_PROMPT =
  "You are Bharat Prompt. Generate ONE long, professional, copy-ready prompt based on the language, categories, and user_text.";

export async function POST(request: NextRequest) {
  try {
    // --- Parse & validate body ---
    const body = (await request.json()) as BuildPromptRequest;

    if (!body?.language || !body?.categories || !body?.user_text) {
      return withCORS(
        NextResponse.json(
          { error: "Missing required fields: language, categories, user_text" },
          { status: 400 }
        )
      );
    }

    if (!Array.isArray(body.categories) || body.categories.length === 0) {
      return withCORS(
        NextResponse.json(
          { error: "Categories must be a non-empty array" },
          { status: 400 }
        )
      );
    }

    if (body.user_text.trim().length < 5) {
      return withCORS(
        NextResponse.json(
          { error: "User text must be at least 5 characters" },
          { status: 400 }
        )
      );
    }

    // --- Ensure secret exists on server ---
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Add OPENAI_API_KEY in Vercel → Project → Settings → Environment Variables
      return withCORS(
        NextResponse.json(
          { error: "Server missing OPENAI_API_KEY" },
          { status: 500 }
        )
      );
    }

    // --- Call OpenAI securely (server-side) ---
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const maxTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 2000);

    // Optional: timeout guard so requests don’t hang forever
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 60_000); // 60s

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            // Send the structured payload so the model can follow your schema
            content: JSON.stringify({
              language: body.language,
              categories: body.categories,
              user_text: body.user_text,
            }),
          },
        ],
      }),
    }).finally(() => clearTimeout(t));

    if (!r.ok) {
      const errText = await r.text().catch(() => "Unknown error");
      // Map common OpenAI errors to friendly messages if you want
      return withCORS(
        NextResponse.json(
          { error: `OpenAI error (${r.status}): ${errText}` },
          { status: r.status }
        )
      );
    }

    const json = await r.json();
    const finalPrompt: string =
      json?.choices?.[0]?.message?.content ?? "(no reply)";

    // --- BuildPromptResponse shape (MVP placeholders for quota/plan) ---
    const response: BuildPromptResponse = {
      final_prompt: finalPrompt,
      quota_left: 10, // TODO: wire to Supabase later
      plan: "free",
    };

    return withCORS(NextResponse.json(response, { status: 200 }));
  } catch (error: any) {
    // AbortError (timeout) → 504-like message
    if (error?.name === "AbortError") {
      return withCORS(
        NextResponse.json(
          { error: "AI service timed out. Please try again." },
          { status: 504 }
        )
      );
    }

    console.error("Build prompt error:", error);
    return withCORS(
      NextResponse.json({ error: "Internal server error" }, { status: 500 })
    );
  }
}

// Preflight for CORS
export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 200 }));
}
