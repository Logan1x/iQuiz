import { NextResponse } from "next/server";
import { unpauseProject } from "../_utils/common";

export async function GET(req: Request) {
  try {
    const res = await unpauseProject();

    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
