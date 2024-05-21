import { NextResponse } from "next/server";
import { generateQuiz } from "./@utils/common";

// To handle a GET request to /api
export async function POST(req: Request) {
  try {
    const { quizTopic, quizDescription, noOfQuestionsToGenerate } =
      await req.json();

    if (!quizTopic) {
      throw new Error("Topic cannot be null");
    }

    const res = await generateQuiz(
      quizTopic,
      quizDescription,
      noOfQuestionsToGenerate
    );

    if (res === null) {
      throw new Error("Received null response from generateQuiz function");
    }

    const quiz = JSON.parse(res);
    return NextResponse.json(quiz, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
