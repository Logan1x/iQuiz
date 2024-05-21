import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

async function sayBot() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion;
}

// To handle a GET request to /api
export async function GET() {
  try {
    const resp = await sayBot();
    return NextResponse.json(
      {
        resp,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
