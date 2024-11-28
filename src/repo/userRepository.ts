import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserInput, UserOutput } from "../types/UserTypes";

const UserRepository = {
  saveUser: async (userData: UserInput): Promise<UserOutput> => {
    const user = new User();
    Object.assign(user, userData);
    return await AppDataSource.manager.save(user);
  },

  findAllUsers: async (): Promise<UserOutput[]> => {
    return await AppDataSource.manager.find(User);
  },

  findUser: async (email: string, phone: string): Promise<User | null> => {
    return await AppDataSource.createQueryBuilder(User, "user")
      .where("user.email = :email", { email })
      .orWhere("user.phone = :phone", { phone })
      .getOne();
  },
};

export default UserRepository;
