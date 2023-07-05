import { db } from "@/db/config";
import { eq } from "drizzle-orm";
import { processes } from "@/drizzle/schema";
import { Process } from '@/types';
import { parseProcess } from '@/lib/utils';

export async function getAllProcesses(userId: string): Promise<Process[]> {
  try {
    const allProcesses = await db.select({
      id: processes.id,
      userId: processes.userId,
      company: processes.company,
      position: processes.position,
      steps: processes.steps,
      isFailed: processes.isFailed,
    }).from(processes).where(eq(processes.userId, userId)).execute();

    console.log("all", allProcesses)

    const parsedProcesses = allProcesses.flatMap((process) => {
      process.steps = JSON.parse(process.steps as string);
      const validatedProcess = parseProcess(process);
      if (!validatedProcess) return [];

      return validatedProcess;
    }, []);

    console.log(parsedProcesses);

    return parsedProcesses;
  } catch (error) {
    console.error(error);
    return [];
  }
}