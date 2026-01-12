import { Todo } from "@/entities/Todo";
import { User } from "@/entities/User";
import { InitialMigration1704902400000 } from "@/lib/db/migrations/1704902400000-InitialMigration";
import { config } from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";

// Load environment variables from .env.local
config({ path: ".env.local" });

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Todo],
  migrations: [InitialMigration1704902400000],
  subscribers: [],
});

let isInitialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (!isInitialized) {
    await AppDataSource.initialize();
    isInitialized = true;
  }
  return AppDataSource;
}

export async function closeDataSource(): Promise<void> {
  if (isInitialized && AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    isInitialized = false;
  }
}
