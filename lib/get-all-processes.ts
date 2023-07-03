import { db } from "@/db/config";
import { eq } from "drizzle-orm";
import { processes } from "@/drizzle/schema";
import { Process } from '@/types';
import { parseProcess } from '@/lib/utils';

export async function getAllProcesses(userId: string): Promise<Process[]> {
  try {
    const allJobs = await db.select({
      id: processes.id,
      userId: processes.userId,
      company: processes.company,
      position: processes.position,
      steps: processes.steps,
      isFailed: processes.isFailed,
    }).from(processes).where(eq(processes.userId, userId)).execute();

    const parsedJobs = allJobs.flatMap((job) => {
      console.log(job);
      const validatedJob = parseProcess(job);
      if (!validatedJob) return [];

      return validatedJob satisfies Process;
    }, []);

    return parsedJobs;
  } catch (error) {
    console.error(error);
    return [];
  }
}