import { NextRequest, NextResponse } from "next/server";
import { generateQuiz } from "./@utils/common";
import { NextApiRequest } from "next";

// To handle a GET request to /api
export async function GET(req: NextApiRequest) {
  try {
    // const { quizTopic, quizDescription, noOfQuestionsToGenerate } = req.body;
    // const resp = await generateQuiz(
    //   quizTopic,
    //   quizDescription,
    //   noOfQuestionsToGenerate
    // );
    const resp = await generateQuiz("minoxidil", "invention of minoxidil", 5);
    const quiz = JSON.parse(resp);
    return NextResponse.json(quiz, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
