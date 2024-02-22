import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";
import { db } from "~/server/db";

// [GET] /api/questionnaire/[id]/tips - get ai tips for questionnaire from db
// params: { id: string }
export const GET = withSession(async ({ session, params }) => {
  const { id } = params as { id: string };
  const tips = await db.reportTips.findMany({
    where: {
      questionnaireId: id,
    },
    select: {
      id: true,
      text: true,
      threat: true,
    },
  });
  return NextResponse.json(tips);
});
