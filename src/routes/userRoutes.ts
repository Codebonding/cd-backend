import express, { Request, Response } from "express";
import userService from "../services/userService";
import middleware from "../helper/middleware";
import { userSchema } from "../helper/schema/registerUserSchema";

const router = express.Router();

router.post(
  "/register",
  middleware(userSchema, "body"),
  async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const result = await userService.registerUser(userData);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error in user registration:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
);

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
});

export default router;
