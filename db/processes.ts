import {
  companies,
  positions,
  processes,
  processesSteps,
  steps,
} from "@/drizzle/schema";
import { InferModel, eq, and } from "drizzle-orm";
import { db } from "./config";

export type Process = InferModel<typeof processes>; // return type when queried
export type NewProcess = InferModel<typeof processes, "insert">; // insert type

export async function addProcess(process: NewProcess) {
  await db.insert(processes).values(process).execute();
  const lastProcess = await db
    .select()
    .from(processes)
    .where(eq(processes.userId, process.userId))
    .orderBy(processes.id)
    .limit(1)
    .execute();

  return lastProcess[0];
}

export async function getProcessById(id: number) {
  const process = (
    await db
      .select({
        id: processes.id,
        userId: processes.userId,
        positionTitle: positions.title,
        location: positions.location,
        url: positions.url,
        status: processes.status,
        notes: processes.notes,
        company: companies.name,
        companyUrl: companies.url,
        createdAt: processes.createdAt,
        updatedAt: processes.updatedAt,
      })
      .from(processes)
      .leftJoin(positions, eq(positions.id, processes.positionId))
      .leftJoin(companies, eq(companies.id, positions.companyId))
      .where(eq(processes.id, id))
      .execute()
  )[0];

  return process;
}

export function getProcessesByUseId(userId: string) {
  return db.select().from(processes).where(eq(processes.userId, userId));
}

export function getProcessesPickByUserId(userId: string) {
  return db
    .select({
      id: processes.id,
      position: positions.title,
      company: companies.name,
      createdAt: processes.createdAt,
      updatedAt: processes.updatedAt,
      status: processes.status,
    })
    .from(processes)
    .leftJoin(positions, eq(positions.id, processes.positionId))
    .leftJoin(companies, eq(companies.id, positions.companyId))
    .where(eq(processes.userId, userId))
    .execute();
}

export function getProcessByUserIdAndStatus(userId: string, status: string) {
  return db
    .select()
    .from(processes)
    .where(and((eq(processes.userId, userId), eq(processes.status, status))));
}

export function getProcesses() {
  return db.select().from(processes);
}

export function updateProcess(id: number, process: Partial<NewProcess>) {
  return db.update(processes).set(process).where(eq(processes.id, id));
}

export function deleteProcess(id: number) {
  return db.delete(processes).where(eq(processes.id, id));
}

export function getStepsByProcessId(processId: number) {
  return db
    .select({
      id: steps.id,
      name: steps.name,
      status: processesSteps.status,
      date: processesSteps.date,
      notes: processesSteps.notes,
    })
    .from(processesSteps)
    .leftJoin(steps, eq(steps.id, processesSteps.stepId))
    .where(eq(processesSteps.processId, processId));
}
