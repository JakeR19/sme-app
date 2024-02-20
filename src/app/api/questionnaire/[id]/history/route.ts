import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { db } from "~/server/db";

// [GET] /api/questionnaire/[id]/history - get risk rating history for specific user
// params: { id: string }
export const GET = withSession(async ({ session, params }) => {
  const { id } = params as { id: string };
  const history = await db.questionnaire.findMany({
    where: {
      createdAt: {
        lte: await db.questionnaire
          .findFirst({
            where: { id },
          })
          .then((row) => row?.createdAt),
      },
      userId: session.user.id,
    },
    select: {
      id: true,
      totalRiskRating: true,
      createdAt: true,
    },
  });
  return NextResponse.json(history);
});
