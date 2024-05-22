import { NextResponse } from "next/server";
import { getQuizzes } from "../_utils/common";

export async function GET(req: Request) {
  try {
    const urlInstance = new URL(req.url);
    const uid = urlInstance.searchParams.get("uid");

    if (!uid) {
      throw new Error("UID cannot be null");
    }

    const res = await getQuizzes(uid);

    if (res === null) {
      throw new Error("Received null response from generateQuiz function");
    }

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
