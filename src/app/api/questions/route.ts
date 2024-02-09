import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";

import { db } from "~/server/db";

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
