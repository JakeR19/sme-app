import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { db } from "~/server/db";

// export async function POST(request: Request) {
//   const data = (await request.json()) as { data: string };
//   return NextResponse.json({ message: "hello", data: data.data });
// }

// [GET] /api/questionnaire - get all questions
export const GET = withSession(async () => {
  const questions = await db.question.findMany({
    select: {
      id: true,
      title: true,
      page: true,
      type: true,
      questionWeight: true,
      yesWeight: true,
      partiallyWeight: true,
      noWeight: true,
    },
  });
  return NextResponse.json(questions);
});

// [POST] /api/questionnaire - create questionnaire
export const POST = withSession(async ({ req }) => {
  console.log(await req.json());
  return NextResponse.json({});
});
