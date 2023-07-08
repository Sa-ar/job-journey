import { companies } from "@/drizzle/schema";
import { InferModel, eq } from "drizzle-orm";
import { db } from "./config";

export type Company = InferModel<typeof companies>; // return type when queried
export type NewCompany = InferModel<typeof companies, 'insert'>; // insert type

export async function addCompany(company: NewCompany) {
  await db.insert(companies).values(company);
  const newCompany = await getCompanyByName(company.name);

  return newCompany;
}

export function getCompanyByName(name: string) {
  return db.select().from(companies).where(eq(companies.name, name));
}

export function getCompanyById(id: number) {
  return db.select().from(companies).where(eq(companies.id, id));
}

export function getCompanies() {
  return db.select().from(companies);
}

export function updateCompany(id: number, company: Partial<NewCompany>) {
  return db.update(companies).set(company).where(eq(companies.id, id));
}

export function deleteCompany(id: number) {
  return db.delete(companies).where(eq(companies.id, id));
}
