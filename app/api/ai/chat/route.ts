import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildChatSystemPrompt } from "@/lib/ai/portfolio-context";
import { chatRequestSchema } from "@/lib/validations/chat";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }

    const locale = parsed.data.locale ?? "ru";
    const recentMessages = parsed.data.messages.slice(-12);

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: buildChatSystemPrompt(locale) },
        ...recentMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 600,
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: "empty" }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
