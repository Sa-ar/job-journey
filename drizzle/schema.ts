import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  serial,
  varchar,
  index,
  datetime,
  text,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const companies = mysqlTable("companies", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 150 }).notNull(),
  url: varchar("url", { length: 255 }),
});

export const positions = mysqlTable(
  "positions",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 150 }).notNull(),
    companyId: serial("company_id").notNull(),
    location: varchar("location", { length: 1000 }),
    url: varchar("url", { length: 255 }),
    status: varchar("status", { length: 100 }).notNull(),
    createdAt: datetime("created_at", { mode: "string" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (table) => {
    return {
      status: index("status").on(table.status),
      title: index("title").on(table.title),
    };
  },
);

export const processes = mysqlTable(
  "processes",
  {
    id: serial("id").primaryKey().notNull(),
    userId: varchar("user_id", { length: 100 }).notNull(),
    positionId: serial("position_id").notNull(),
    status: varchar("status", { length: 100 }).notNull(),
    notes: text("notes"),
    createdAt: datetime("created_at", { mode: "string" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (table) => {
    return {
      createdAt: index("created_at").on(table.createdAt),
      updatedAt: index("updated_at").on(table.updatedAt),
      userPosition: index("user_position").on(table.userId, table.status),
    };
  },
);

export const processesSteps = mysqlTable(
  "processes_steps",
  {
    stepId: serial("step_id").notNull(),
    processId: serial("process_id").notNull(),
    notes: text("notes"),
    status: varchar("status", { length: 100 }).notNull(),
    date: datetime("date", { mode: "string" }),
    createdAt: datetime("created_at", { mode: "string" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (table) => {
    return {
      date: index("date").on(table.date),
      status: index("status").on(table.status),
      processesStepsProcessIdStepId: primaryKey(table.processId, table.stepId),
    };
  },
);

export const steps = mysqlTable("steps", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 150 }).notNull(),
});
