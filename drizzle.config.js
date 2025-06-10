import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_SOTwx01jAWQi@ep-tight-king-a12temqu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
});
