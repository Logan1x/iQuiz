import { NextResponse } from "next/server";
import { generateQuiz, createQuiz } from "../_utils/common";

export async function POST(req: Request) {
  try {
    const { quizTopic, quizDescription, noOfQuestionsToGenerate, uid } =
      await req.json();

    if (!quizTopic) {
      throw new Error("Topic cannot be null");
    }

    if (noOfQuestionsToGenerate < 20) {
      throw new Error("Number of questions to generate should be less than 20");
    }

    const res = await generateQuiz(
      quizTopic,
      quizDescription,
      noOfQuestionsToGenerate
    );

    if (res === null) {
      throw new Error("Received null response from generateQuiz function");
    }

    await createQuiz(res, uid);

    const quiz = JSON.parse(res);

    return NextResponse.json(quiz, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
