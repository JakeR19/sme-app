// [GET] /api/questionnaire - get specific questionnaire

import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { db } from "~/server/db";

// [GET] /api/questionnaire/[id] - get specific questionnaire by id
// params: { id: string }
export const GET = withSession(async ({ session, params }) => {
  const { id } = params as { id: string };
  const questionnaire = await db.questionnaire.findFirst({
    where: {
      userId: session.user.id,
      id,
    },
    include: {
      answers: true,
      _count: {
        select: {
          answers: true,
        },
      },
    },
  });
  return NextResponse.json(questionnaire);
});
