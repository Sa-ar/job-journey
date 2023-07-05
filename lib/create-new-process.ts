"use server"

import { db } from "@/db/config";
import { processes } from "@/drizzle/schema";

import { ProcessValues, Process, isError } from "@/types";

export async function createNewProcess(userId: string, values: ProcessValues): Promise<string | null> {
  try {
    const newProcess = {
      userId,
      company: values.company,
      position: values.position,
      steps: JSON.stringify(values.steps),
      isFailed: 0,
    }
    await db.insert(processes).values(newProcess).execute();

    return null;
  } catch (error) {
    console.log('error creating new process');
    console.error(error);

    return isError(error) ? error.message : 'error creating new process';
  }
}
