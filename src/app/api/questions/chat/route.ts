import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import OpenAI from "openai";
import { env } from "~/env";
import { chatSystemInput } from "~/lib/constants";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// [POST] /api/questionnaire/chat - get weights/likelihood from gpt
export async function POST(req: Request) {
  const { sector, questions } = (await req.json()) as {
    sector: string;
    questions: { id: string; title: string }[];
  };

  // call openai chat api to get common threats for specific sector
  const threatsResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `For a company based in the sector provided in the user prompt, compose a list of the 5 most common cybersecurity threats they may face.
        The threats should be a maximum of 2-3 words. The list HAS to have 5 threats, not more than 5 and not less than 5, 5 in total.
        Your output should be an array of the threats in plain JSON format ONLY (no json backtick tag at the beginning or end)`,
      },
      {
        role: "user",
        content: `Provide me the 5 most common threats for a company in the ${sector} sector`,
      },
    ],
  });
  // retrieve threats and parse into json object
  const threats = String(threatsResponse.choices[0]?.message.content);
  const parsedThreats = JSON.parse(threats) as string[];

  // if threats are present we can then assign threats and likelihoods to each answer
  if (parsedThreats.length > 0) {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: chatSystemInput(
            JSON.stringify(questions),
            questions.length,
            parsedThreats.join(", "),
          ),
        },
        {
          role: "user",
          content: `Provide me the likelihood values for the ${sector} sector`,
        },
      ],
    });
    return NextResponse.json({ gptResponse, parsedThreats });
  }

  return NextResponse.json({});
}
