import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { createNewProcess } from "@/lib/create-new-process";
import { processValuesSchema } from "@/types";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const [body] = await await req.json();
  const parsedBody = processValuesSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json("Not enough data provided", { status: 400 });
  }

  const res = await createNewProcess(userId, parsedBody.data);
  if (res) {
    return NextResponse.json({ message: res }, { status: 500 });
  }

  return NextResponse.json({ process: { ...parsedBody.data, userId, isFailed: false } });
}
