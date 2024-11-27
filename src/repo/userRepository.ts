import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserInput, UserOutput } from "../types/UserTypes";

const saveUser = async (userData: UserInput): Promise<UserOutput> => {
  const user = new User();
  Object.assign(user, userData);
  return await AppDataSource.manager.save(user);
};

const findAllUsers = async (): Promise<UserOutput[]> => {
  return await AppDataSource.manager.find(User);
};

export default { saveUser, findAllUsers };
