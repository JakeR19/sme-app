import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "",
// });

// [POST] /api/questionnaire/chat - get weights/likelihood from gpt
export const POST = withSession(async ({ req }) => {
  const { sector, questions } = (await req.json()) as {
    sector: string;
    questions: [{ id: string; title: string }];
  };

  // const gptResponse = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: "Questions here....",
  //     },
  //     {
  //       role: "user",
  //       content: "sector here....",
  //     },
  //   ],
  //   temperature: 0,
  //   max_tokens: 1024,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  // });

  return NextResponse.json({ sector: sector + " hello", questions });
});
