import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const polishSchema = z.object({
  text: z.string().min(5).max(2000),
});

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const parsed = polishSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You improve professional contact messages for a developer portfolio. Keep the same language as the input. Return only the improved text, no explanations.",
        },
        {
          role: "user",
          content: parsed.data.text,
        },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    const text = completion.choices[0]?.message?.content?.trim();

    if (!text) {
      return NextResponse.json({ error: "empty" }, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI polish error:", error);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
