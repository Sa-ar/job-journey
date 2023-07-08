"use server";

import { getCompanyByName, addCompany } from "@/db/companies";
import { addPosition } from "@/db/positions";
import { addProcess as addProcessDb } from "@/db/processes";

import { auth } from "@clerk/nextjs";

export async function addProcess(formData: FormData) {
  "use server";
  try {
    const { userId } = await auth();
    const companyName = formData.get("company")?.toString() || "";
    const positionTitle = formData.get("positionTitle")?.toString() || "";

    let company = await getCompanyByName(companyName).execute();
    if (company.length === 0) {
      company = await addCompany({ name: companyName });
    }

    const newPosition = {
      title: positionTitle,
      companyId: company[0].id,
      status: "Active",
    };
    const position = await addPosition(newPosition);

    const newProcess = {
      userId: userId ?? "",
      positionId: position.id,
      status: "Active",
    };
    const process = await addProcessDb(newProcess);

    return process;
  } catch (error) {
    console.error(error);
  }
}
