import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { type SubmitQuestionnaireReqType } from "~/lib/types/questionnaire";

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

// [POST] /api/questionnaire - submit questionnaire (company info and answers)
export const POST = withSession(async ({ req, session }) => {
  const { companyInformation, answers } =
    (await req.json()) as SubmitQuestionnaireReqType;
  const questionnaire = await db.questionnaire.create({
    data: {
      companyName: companyInformation.companyName,
      sector: companyInformation.sector,
      userId: session.user.id,
    },
  });
  return NextResponse.json({});
});
