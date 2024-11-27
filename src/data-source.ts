import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { getEntities } from "./entity/entities";
import { getMigrations } from "./migration/migrations";

console.log(
  process.env.HOST,
  process.env.USER,
  process.env.PASSWORD,
  process.env.DATABASE,
  "database"
);

export const AppDataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: true,
  entities: getEntities(),
  subscribers: [],
  migrations: getMigrations(),
  migrationsTableName: "migrations_typeorm",
});
