// src/app/api/tts/route.ts
import { NextRequest } from "next/server";
import * as googleTTS from "google-tts-api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  if (!text) {
    return new Response(JSON.stringify({ error: "Text is required" }), {
      status: 400,
    });
  }

  try {
    const base64Chunks = await googleTTS.getAllAudioBase64(text, {
      lang: "en",
      slow: false,
      splitPunct: ",.?",
    });

    return new Response(JSON.stringify({ base64Chunks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("TTS error:", err);
    return new Response(JSON.stringify({ error: "TTS failed" }), {
      status: 500,
    });
  }
}