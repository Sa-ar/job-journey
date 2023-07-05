import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { processes } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs";

import { parseProcess } from "@/lib/utils";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import ProcessesHeader from "./header";

import { db } from "@/db/config";
import { Process } from "@/types";

async function getAllProcesses(userId: string): Promise<Process[]> {
  try {
    const allProcesses = await db
      .select({
        id: processes.id,
        userId: processes.userId,
        company: processes.company,
        position: processes.position,
        steps: processes.steps,
        isFailed: processes.isFailed,
      })
      .from(processes)
      .where(eq(processes.userId, userId))
      .execute();

    const parsedProcesses = allProcesses.flatMap((process) => {
      process.steps = JSON.parse(process.steps as string);
      const validatedProcess = parseProcess(process);
      if (!validatedProcess) return [];

      return validatedProcess;
    }, []);

    return parsedProcesses;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ProcessPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/login");

  const processes = await getAllProcesses(userId);
  const totalProcesses = processes.length;

  return (
    <>
      <ProcessesHeader />
      <DataTable columns={columns} data={processes} total={totalProcesses} />
    </>
  );
};

export default ProcessPage;
