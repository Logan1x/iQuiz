import { NextResponse } from "next/server";
import {
  generateQuiz,
  createQuiz,
  postQuizHistory,
  getQuizHistory,
} from "../_utils/common";

export async function GET(req: Request) {
  try {
    const urlInstance = new URL(req.url);
    const quizId = urlInstance.searchParams.get("qid");

    if (!quizId) {
      throw new Error("quizId cannot be null");
    }

    const res = await getQuizHistory(quizId);

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { quizId, uid, score, userName, userAvatar } = await req.json();

    if (!quizId || !uid || !score) {
      throw new Error("quizId, uid, and score cannot be null");
    }

    const res = await postQuizHistory(quizId, uid, score, userName, userAvatar);

    return NextResponse.json({ status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
