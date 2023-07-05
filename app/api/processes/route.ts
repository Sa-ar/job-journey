import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { createNewProcess } from "@/lib/create-new-process";
import { getAllProcesses } from "@/lib/get-all-processes";
import { processValuesSchema } from "@/types";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const processes = await getAllProcesses(userId);

  return NextResponse.json({ processes }, { status: 200 });
}

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

  await createNewProcess(userId, parsedBody.data);

  return NextResponse.json({ process: { ...parsedBody.data, userId, isFailed: false } });
}
