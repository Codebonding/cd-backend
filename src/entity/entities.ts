import { DataSourceOptions } from "typeorm";
import { User } from "./User";
import { Company } from "./company";

export const getEntities = (): DataSourceOptions["entities"] => {
  return [User, Company];
};
