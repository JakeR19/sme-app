import { NextResponse } from "next/server";
import OpenAI from "openai";
import { env } from "~/env";
import { withSession } from "~/lib/auth.ts";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// [POST] /api/questionnaire/chat/tips - get tips for report dashboard
export const POST = withSession(async ({ req }) => {
  const { sector } = (await req.json()) as {
    sector: string;
  };

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "test",
      },
      {
        role: "user",
        content: "",
      },
    ],
  });
  return NextResponse.json({});
});
