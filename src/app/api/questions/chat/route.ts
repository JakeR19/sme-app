import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";

// [GET] /api/questionnaire/chat - get weights from gpt
export const GET = withSession(async ({ req }) => {
  console.log(await req.json());
  return NextResponse.json({});
});
