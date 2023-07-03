"use server"

import { db } from "@/db/config";
import { processes } from "@/drizzle/schema";

import { Process, ProcessValues } from "@/types";

export async function createNewProcess(userId: string, values: ProcessValues, ...rest: any[]): Promise<string> {
  console.log(values, rest)
  try {
    const newProcess: Omit<Process, "id"> = {
      userId,
      company: values.company,
      position: values.position,
      steps: JSON.stringify(values.steps),
      isFailed: 0,
    }
    await db.insert(processes).values(newProcess).execute();

    return "success";
  } catch (error) {
    console.log('error creating new process');
    console.error(error);

    return typeof error === "object" && error !== null && "message" in error ? String(error.message) : 'error creating new process';
  }
}
