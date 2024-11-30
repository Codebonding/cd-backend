import { companyRepository } from "../repo/companyRepository";
import { Company } from "../entity/company";

export const companyService = {
  async getAllCompanies(): Promise<Company[]> {
    return await companyRepository.findAll();
  },

  async getCompanyById(id: string): Promise<Company | null> {
    const company = await companyRepository.findById(id);
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    return company;
  },

  async createCompany(data: Partial<Company>): Promise<Company> {
    if (!data.companyName || !data.companyApplyLink) {
      throw new Error("Company name and apply link are required");
    }
    return await companyRepository.create(data);
  },

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    const existingCompany = await companyRepository.findById(id);
    if (!existingCompany) {
      throw new Error(`Cannot update: Company with ID ${id} does not exist`);
    }

    const updatedCompany = await companyRepository.update(id, data);
    if (!updatedCompany) {
      throw new Error(
        `Unexpected error: Company with ID ${id} could not be updated`
      );
    }

    return updatedCompany;
  },
  async deleteCompany(id: string): Promise<void> {
    const existingCompany = await companyRepository.findById(id);
    if (!existingCompany) {
      throw new Error(`Cannot delete: Company with ID ${id} does not exist`);
    }

    await companyRepository.delete(id);
  },
};
