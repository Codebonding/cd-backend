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

  // Validate required fields
  if (!name || !email || !phone) {
    throw new Error("Name, Email, and Phone are required fields.");
  }

  // Create the user object
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

  // Save the user and return the result
  return await UserRepository?.saveUser(user);
};

const getAllUsers = async (): Promise<UserOutput[]> => {
  // Retrieve all users from the repository
  return await UserRepository?.findAllUsers();
};

export default { registerUser, getAllUsers };
