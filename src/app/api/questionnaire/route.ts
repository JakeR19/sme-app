import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { type SubmitQuestionnaireReqType } from "~/lib/types/questionnaire";
import { db } from "~/server/db";

// [POST] /api/questionnaire - submit questionnaire (company info and answers)
// params: { companyInformation: {}, answers: {} }
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
  if (questionnaire) {
    await db.answer.createMany({
      data: answers.map((answer) => {
        return {
          ...answer,
          questionnaireId: questionnaire.id,
          userId: session.user.id,
        };
      }),
    });
  }
  return NextResponse.json({ questionnaire });
});
