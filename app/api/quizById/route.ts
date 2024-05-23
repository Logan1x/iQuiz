import { NextResponse } from "next/server";
import { getQuizById } from "../_utils/common";

export async function GET(req: Request) {
  try {
    const urlInstance = new URL(req.url);
    const uid = urlInstance.searchParams.get("uid");
    const quizId = urlInstance.searchParams.get("quizId");

    if (!quizId) {
      throw new Error("quizId cannot be null");
    }

    if (uid === null) {
      throw new Error("uid cannot be null");
    }

    const res = await getQuizById(quizId, uid);

    if (res === null) {
      throw new Error("Received null response from generateQuiz function");
    }

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
