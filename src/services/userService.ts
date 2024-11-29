import UserRepository from "../repo/userRepository";
import { UserInput } from "../types/UserTypes";
import nodemailer from "nodemailer";
import "dotenv/config";

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
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CodeBonding</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(45deg, #4caf50, #81c784);
            color: #ffffff;
            text-align: center;
            padding: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header p {
            margin: 5px 0 0;
            font-size: 16px;
        }
        .content {
            padding: 20px 30px;
            color: #333;
            line-height: 1.8;
        }
        .content h2 {
            color: #4caf50;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .content p {
            margin-bottom: 20px;
        }
        .content ul {
            padding: 0;
            margin: 10px 0;
            list-style: none;
        }
        .content ul li {
            margin: 10px 0;
            padding-left: 20px;
            position: relative;
        }
        .content ul li:before {
            content: "✔";
            position: absolute;
            left: 0;
            color: #4caf50;
            font-size: 16px;
        }
        .btn {
            display: inline-block;
            background: #4caf50;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn:hover {
            background: #45a049;
        }
        .footer {
            text-align: center;
            background: #f1f1f1;
            color: #666;
            padding: 20px;
            font-size: 14px;
        }
        .footer a {
            color: #4caf50;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to CodeBonding!</h1>
            <p>Empowering Future Developers</p>
        </div>
        <div class="content">
            <h2>Thank You for Joining Us!</h2>
            <p>Dear ${name},</p>
            <p>We are delighted to welcome you to *CodeBonding*, where we shape the next generation of full-stack developers. Your decision to join us marks the beginning of an exciting journey toward a successful IT career.</p>
            <h3>What You Can Expect:</h3>
            <ul>
                <li>Comprehensive Full-Stack Development Training</li>
                <li>5+ Real-World Projects for Hands-On Experience</li>
                <li>Live Mentorship Sessions with Industry Experts</li>
                <li>6-Month Internship with Performance-Based Extension</li>
                <li>Placement Assistance and Career Guidance</li>
            </ul>
            <p>We are committed to providing you with the best learning experience and the skills you need to excel. Our team will guide and support you at every step of your journey.</p>

            <h3>Terms and Conditions</h3>
            <p>Please download the document, sign it E-signature , and then resend it to the CodeBonding email address.</p>
            <p><a href="https://docs.google.com/document/d/1W9I9yi6VoPF9P7gq2-nNXDuQq9XTISEN99dCeUOkwL4/edit?usp=sharing" class="btn">Download and Sign the Document</a></p>
			Please re-register on our website.
            <p><a href="https://www.codebonding.com" class="btn">Access Your Website</a></p>
            <p>If you have any questions, feel free to reach us at <a href="mailto:codebonding@gmail.com">codebonding@gmail.com</a>.</p>
            <p>Welcome aboard, and let's start building your future!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 CodeBonding | Salem, Tamil Nadu, India</p>
            <p><a href="https://www.codebonding.com">Visit our website</a> | <a href="mailto:support@codebonding.com">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
`,
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
