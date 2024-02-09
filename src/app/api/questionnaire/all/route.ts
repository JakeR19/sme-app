import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { db } from "~/server/db";

// [GET] /api/questionnaire/all - get all questionnaires by current user
export const GET = withSession(async ({ session }) => {
  const questionnaires = await db.questionnaire.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      // include count of how many answers were provided
      _count: {
        select: {
          answers: true,
        },
      },
    },
  });
  return NextResponse.json(questionnaires);
});
