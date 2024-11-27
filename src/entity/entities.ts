import { DataSourceOptions } from "typeorm";
import { User } from "./User";

export const getEntities = (): DataSourceOptions["entities"] => {
  return [User];
};
