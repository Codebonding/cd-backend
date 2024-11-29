import express from "express";
const fs = require('fs');
import { AppDataSource } from "./src/data-source";
import userRoutes from "./src/routes/userRoutes";
const https = require('https');
import cors from "cors"; // Import the CORS package

const app = express();
app.use(cors());

app.use(express.json());

const privateKey = fs.readFileSync('/etc/ssl/private/server.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/certs/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page API!");
});
app.use("/users", userRoutes);

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    https.createServer(credentials, app).listen(443, () => {
      console.log('Server running on https://localhost:443');
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
