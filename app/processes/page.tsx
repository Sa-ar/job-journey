import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import ProcessesHeader from "./header";

import { getProcessesPickByUserId } from "@/db/processes";
import { processPickSchema } from "@/types";

async function getAllProcesses(userId: string) {
  try {
    const allProcesses = await getProcessesPickByUserId(userId);

    return allProcesses.map((process) => processPickSchema.parse(process));
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
