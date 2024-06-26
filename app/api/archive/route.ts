import { NextResponse } from "next/server";
import { generateQuiz, createQuiz, archiveQuiz } from "../_utils/common";

export async function POST(req: Request) {
  try {
    const { quizId, uid } = await req.json();

    if (!quizId || !uid) {
      throw new Error("quizId or User id cannot be null");
    }

    const res = await archiveQuiz(quizId, uid);

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
