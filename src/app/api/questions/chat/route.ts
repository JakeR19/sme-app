import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import OpenAI from "openai";
import { env } from "~/env";
import { chatSystemInput } from "~/lib/constants";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// [POST] /api/questionnaire/chat - get weights/likelihood from gpt
export const POST = withSession(async ({ req }) => {
  const { sector, questions } = (await req.json()) as {
    sector: string;
    questions: string[];
  };

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: chatSystemInput(JSON.stringify(questions), questions.length),
      },
      {
        role: "user",
        content: `Provide me the likelihood values for the ${sector} sector`,
      },
    ],
  });

  return NextResponse.json(gptResponse);
});
