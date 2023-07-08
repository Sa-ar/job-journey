import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
};

const connection = connect(config);

export const db = drizzle(connection);
