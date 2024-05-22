import { NextResponse } from "next/server";
import { generateQuiz } from "./@utils/common";
import { supabase } from "@/config/supabaseConfig";

async function postData(res: string) {
  try {
    const { error } = await supabase
      .from("quizes")
      .insert([{ quizzes: res }])
      .select();

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("error", error);
  }
}

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

    await postData(res);

    const quiz = JSON.parse(res);

    return NextResponse.json(quiz, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
