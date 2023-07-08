import { steps } from "@/drizzle/schema";
import { InferModel, eq } from "drizzle-orm";
import { db } from "./config";

export type Step = InferModel<typeof steps>; // return type when queried
export type NewStep = InferModel<typeof steps, 'insert'>; // insert type

export function addStep(step: NewStep) {
  return db.insert(steps).values(step);
}

export function getStepById(id: number) {
  return db.select().from(steps).where(eq(steps.id, id));
}

export function getStepsByName(name: string) {
  return db.select().from(steps).where(eq(steps.name, name));
}

export function getSteps() {
  return db.select().from(steps);
}

export function updateStep(id: number, step: Partial<NewStep>) {
  return db.update(steps).set(step).where(eq(steps.id, id));
}

export function deleteStep(id: number) {
  return db.delete(steps).where(eq(steps.id, id));
}
