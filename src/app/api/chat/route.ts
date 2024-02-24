import OpenAI from "openai";
import { env } from "~/env";
import { withSession } from "~/lib/auth.ts";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// [POST] /api/chat - chat with ai to get help with questions
export const POST = withSession(async ({ req }) => {
  const { messages } = (await req.json()) as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any[];
  };

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // stream response back using vercel ai sdk
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
});
