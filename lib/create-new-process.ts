"use server"

import { getCompanyByName, addCompany } from "@/db/companies";
import { addPosition } from "@/db/positions";
import { addProcess as addProcessDb } from "@/db/processes";
// import { db } from "@/db/config";
// import { companies, processes, positions } from "@/drizzle/schema";

// import { isError } from "@/types";
import { auth } from "@clerk/nextjs";
// import { eq } from "drizzle-orm";

// export async function createNewProcess(userId: string, values): Promise<string | null> {
//   console.log('creating new process');
//   try {
//     let company = await db.select({ id: companies.id, name: companies.name, url: companies.url }).from(companies).where(eq(companies.name, values.company)).execute();
//     if (company.length === 0) {
//       const newCompany = {
//         name: values.company,
//       };
//       // company = await db.insert(companies).values(newCompany).execute();
//       // console.log('new company created', company);
//     }
//     // const newPosition = {
//     //   title: values.positionTitle,
//     //   companyId: company[0].id,
//     // };
//     // let position = await db.insert(positions).values(newPosition).execute();
//     // const newProcess = {
//     //   userId,
//     //   positionId: position[0].id,
//     // }
//     // await db.insert(processes).values(newProcess).execute();

//     return null;
//   } catch (error) {
//     console.log('error creating new process');
//     console.error(error);

//     return isError(error) ? error.message : 'error creating new process';
//   }
// }

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
