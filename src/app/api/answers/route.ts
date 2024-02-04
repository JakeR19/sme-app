import { NextResponse } from "next/server";
import { withSession } from "~/lib/auth.ts";

// [POST] /api/answers - add answers to db/questionnaire
export const POST = withSession(async ({ req }) => {
  console.log(await req.json());
  return NextResponse.json({});
});
