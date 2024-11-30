import { Company } from "../entity/company";
import { AppDataSource } from "../data-source";

export const companyRepository = {
  async create(companyData: Partial<Company>) {
    const repository = AppDataSource.getRepository(Company);
    const company = repository.create(companyData);
    return await repository.save(company);
  },

  async findAll() {
    const repository = AppDataSource.getRepository(Company);
    return await repository.find();
  },

  async findById(id: string) {
    const repository = AppDataSource.getRepository(Company);
    return await repository.findOne({ where: { id } });
  },

  async update(id: string, companyData: Partial<Company>): Promise<Company> {
    const repository = AppDataSource.getRepository(Company);
    await repository.update(id, companyData);

    // Ensure a valid Company object is always returned
    const updatedCompany = await repository.findOne({ where: { id } });
    if (!updatedCompany) {
      throw new Error(`Company with ID ${id} not found after update`);
    }

    return updatedCompany;
  },

  async delete(id: string) {
    const repository = AppDataSource.getRepository(Company);
    return await repository.delete(id);
  },
};
