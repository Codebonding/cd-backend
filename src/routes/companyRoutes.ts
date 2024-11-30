import express from "express";
import { companyService } from "../services/companyService";
import middleware from "../helper/middleware";
import { companyValidationSchema } from "../helper/schema/companySchema";

export const companyRouter = express.Router();

companyRouter.get("/", async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

companyRouter.get("/:id", async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

companyRouter.post(
  "/",
  middleware(companyValidationSchema?.create, "body"),
  async (req, res) => {
    try {
      const company = await companyService.createCompany(req.body);
      res.status(201).json(company);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

companyRouter.put(
  "/:id",
  middleware(companyValidationSchema?.update, "body"),
  async (req, res) => {
    try {
      const company = await companyService.updateCompany(
        req.params.id,
        req.body
      );
      res.status(200).json(company);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

companyRouter.delete("/:id", async (req, res) => {
  try {
    await companyService.deleteCompany(req.params.id);
    res.status(200).json({ message: "Company deleted" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});
