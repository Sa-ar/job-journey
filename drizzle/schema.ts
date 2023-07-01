import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, json, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const processes = mysqlTable("processes", {
	id: int("id").autoincrement().primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	company: varchar("company", { length: 255 }),
	position: varchar("position", { length: 255 }),
	steps: json("steps"),
	currentStepIndex: int("current_step_index").default(0),
	isFailed: tinyint("is_failed").default(0),
	isDeleted: tinyint("is_deleted").default(0),
});