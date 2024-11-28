import express from "express";
import { AppDataSource } from "../src/data-source";
import userRoutes from "../src/routes/userRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page API!");
});
app.use("/users", userRoutes);

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
