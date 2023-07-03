import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, json, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const processes = mysqlTable("processes", {
	id: int("id").autoincrement().primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	company: varchar("company", { length: 255 }).notNull(),
	position: varchar("position", { length: 255 }).notNull(),
	steps: json("steps").notNull(),
	isFailed: tinyint("is_failed").default(0),
});