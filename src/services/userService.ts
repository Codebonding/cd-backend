import UserRepository from "../repo/userRepository";
import { UserInput } from "../types/UserTypes";
import nodemailer from "nodemailer";
import "dotenv/config";
import { EmailHelper } from "../helper/constants";

const registerUser = async (userData: UserInput): Promise<any> => {
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

  const result = await UserRepository.saveUser(user);
  if (result) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codebonding@gmail.com",
        pass: process.env.GPASSKEY,
      },
    });
    const mailOptions = {
      from: "codebodning@gmail.com",
      to: email,
      subject: "Welcome to Our Service!",
      html: EmailHelper(name),
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email.");
    }
    return result;
  }
};

const getAllUsers = async (): Promise<any> => {
  return await UserRepository?.findAllUsers();
};

export default { registerUser, getAllUsers };
