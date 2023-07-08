import { positions } from "@/drizzle/schema";
import { InferModel, eq } from "drizzle-orm";
import { db } from "./config";

export type Position = InferModel<typeof positions>; // return type when queried
export type NewPosition = InferModel<typeof positions, 'insert'>; // insert type

export async function addPosition(position: NewPosition) {
  (await db.insert(positions).values(position).execute());
  const lastPosition = await db.select().from(positions).orderBy(positions.id).limit(1).execute();

  return lastPosition[0];
}

export function getPositionById(id: number) {
  return db.select().from(positions).where(eq(positions.id, id));
}

export function getPositionsByTitle(title: string) {
  return db.select().from(positions).where(eq(positions.title, title));
}

export function getPositions() {
  return db.select().from(positions);
}

export function updatePosition(id: number, position: Partial<NewPosition>) {
  return db.update(positions).set(position).where(eq(positions.id, id));
}

export function deletePosition(id: number) {
  return db.delete(positions).where(eq(positions.id, id));
}

export function getPositionsByCompanyId(companyId: number) {
  return db.select().from(positions).where(eq(positions.companyId, companyId));
}

export function getPositionsByUrl(url: string) {
  return db.select().from(positions).where(eq(positions.url, url));
}
