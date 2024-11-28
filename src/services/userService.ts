import UserRepository from "repo/userRepository";
import { UserOutput } from "../types/UserTypes";
import { UserInput } from "../types/UserTypes";

const registerUser = async (userData: UserInput): Promise<UserOutput> => {
  const {
    name,
    email,
    phone,
    department,
    degree,
    passedOutYear,
    address,
    district,
    state,
    pinCode,
  } = userData;

  if (!name || !email || !phone) {
    throw new Error("Name, Email, and Phone are required fields.");
  }
  const existingUser = await UserRepository.findUser(email, phone);
  if (existingUser) {
    throw new Error("User with the same email or phone already exists.");
  }
  const user = {
    name,
    email,
    phone,
    department,
    degree,
    passedOutYear,
    address,
    district,
    state,
    pinCode,
  };

  return await UserRepository.saveUser(user);
};

const getAllUsers = async (): Promise<UserOutput[]> => {
  return await UserRepository?.findAllUsers();
};

export default { registerUser, getAllUsers };
