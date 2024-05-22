import { NextResponse } from "next/server";
import { getQuizzes } from "../@utils/common";

export async function GET(req: Request) {
  try {
    console.log("req", req);
    const op = await req.url.search;
    console.log("op", op);

    console.log("uid", uid);

    if (!uid) {
      throw new Error("UID cannot be null");
    }

    const res = await getQuizzes(uid);

    if (res === null) {
      throw new Error("Received null response from generateQuiz function");
    }

    // const quiz = JSON.parse(res);

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
