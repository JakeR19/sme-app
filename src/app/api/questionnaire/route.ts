import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { type SubmitQuestionnaireReqType } from "~/lib/types/questionnaire";
import { db } from "~/server/db";

// [POST] /api/questionnaire - submit questionnaire (company info and answers)
// params: { companyInformation: {}, answers: {} }
export const POST = withSession(async ({ req, session }) => {
  const { companyInformation, answers } =
    (await req.json()) as SubmitQuestionnaireReqType;
  console.log(answers);
  // sum up all answer calculations in order to get rating value
  const calculationSum = answers.reduce((acc, value) => {
    return acc + value.calculation;
  }, 0);
  const questionnaire = await db.questionnaire.create({
    data: {
      companyName: companyInformation.companyName,
      sector: companyInformation.sector,
      userId: session.user.id,
      totalRiskRating: calculationSum,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });
  if (questionnaire) {
    await db.answer.createMany({
      data: answers.map((answer) => {
        // delete leftover "value" property from radio handleChange
        if ("value" in answer) {
          delete answer.value;
        }
        return {
          ...answer,
          questionnaireId: questionnaire.id,
          userId: session.user.id,
        };
      }),
    });
  }
  return NextResponse.json({});
});
