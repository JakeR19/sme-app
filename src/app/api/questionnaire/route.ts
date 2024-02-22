import { NextResponse } from "next/server";
import OpenAI from "openai";
import { env } from "~/env";
import { withSession } from "~/lib/auth.ts";
import { riskTipsSystemInput } from "~/lib/constants";
import { type SubmitQuestionnaireReqType } from "~/lib/types/questionnaire";
import { db } from "~/server/db";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// [POST] /api/questionnaire - submit questionnaire (company info and answers)
// params: { companyInformation: {}, answers: {} }
export const POST = withSession(async ({ req, session }) => {
  const { companyInformation, answers, threats } =
    (await req.json()) as SubmitQuestionnaireReqType;

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
    // get tips from gpt and insert into report tips model, attached to the questionnaire by id
    const tipsResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: riskTipsSystemInput(JSON.stringify(threats)),
        },
        {
          role: "user",
          content: `Provide me tips for the ${companyInformation.sector} sector`,
        },
      ],
    });
    if (tipsResponse) {
      const tips = String(tipsResponse.choices[0]?.message.content);
      const parsedTips = JSON.parse(tips) as {
        threat: string;
        text: string;
      }[];
      await db.reportTips.createMany({
        data: parsedTips.map((tip) => {
          return {
            questionnaireId: questionnaire.id,
            text: tip.text,
            threat: tip.threat,
          };
        }),
      });
    }
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
  return NextResponse.json(questionnaire);
});
