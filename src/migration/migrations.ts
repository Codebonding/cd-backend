import { DataSourceOptions } from "typeorm";
import { Users1732705537712 } from "./1732705537712-users";

export const getMigrations = (): DataSourceOptions["migrations"] => {
  return [Users1732705537712];
};
