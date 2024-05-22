import { NextResponse } from "next/server";
import { getQuizById } from "../_utils/common";

export async function GET(req: Request) {
  try {
    const { quizId, uid } = await req.json();

    if (!quizId) {
      throw new Error("quizId cannot be null");
    }

    const res = await getQuizById(quizId, uid);

    if (res === null) {
      throw new Error("Received null response from generateQuiz function");
    }

    // const quiz = JSON.parse(res);

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
