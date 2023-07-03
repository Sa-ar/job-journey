import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { createNewProcess } from "@/lib/create-new-process";
import { getAllProcesses } from "@/lib/get-all-processes";

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
  if (!body) {
    return NextResponse.json("No body provided", { status: 400 });
  }

  const { company, position, steps, isFailed } = body;

  await createNewProcess(userId, { company, position, steps });

  return NextResponse.json({ process: { userId, company, position, steps, isFailed } });
}
