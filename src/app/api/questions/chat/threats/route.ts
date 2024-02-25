import { NextResponse } from "next/server";
import OpenAI from "openai";
import { env } from "~/env";
import { withSession } from "~/lib/auth.ts";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const POST = withSession(async ({ req }) => {
  const { sector } = (await req.json()) as {
    sector: string;
  };
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
  const threats = String(threatsResponse.choices[0]?.message.content);
  const parsedThreats = JSON.parse(threats) as string[];
  return NextResponse.json(parsedThreats);
});
