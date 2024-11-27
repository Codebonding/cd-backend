import userRepository from "src/repo/userRepository";
import { UserOutput } from "../types/UserTypes";
import { UserInput } from "../types/UserTypes";

const registerUser = async (userData: UserInput): Promise<UserOutput> => {
  const { name, email, phone, passedOutYear, address, district, state, pinCode } = userData;

  if (!name || !email || !phone) {
    throw new Error("Name, Email, and Phone are required fields.");
  }

  const user = {
    name,
    email,
    phone,
    passedOutYear,
    address,
    district,
    state,
    pinCode,
  };

  return await userRepository.saveUser(user);
};

const getAllUsers = async (): Promise<UserOutput[]> => {
  return await userRepository.findAllUsers();
};

export default { registerUser, getAllUsers };
