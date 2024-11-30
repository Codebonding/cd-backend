import { DataSourceOptions } from "typeorm";
import { Users1732705537712 } from "./1732705537712-users";
import { Company1732978849300 } from "./1732978849300-company";

export const getMigrations = (): DataSourceOptions["migrations"] => {
  return [Users1732705537712, Company1732978849300];
};
