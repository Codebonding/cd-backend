import { Company } from "../entity/company";
import { AppDataSource } from "../data-source";

export const companyRepository = {
  async create(companyData: Partial<Company>) {
    const repository = AppDataSource.getRepository(Company);

    const count = await repository.count();

    if (count >= 15) {
      const oldestRecord = await repository.find({
        order: { createdAt: "ASC" },
        take: 1,
      });

      if (oldestRecord.length > 0) {
        await repository.remove(oldestRecord[0]);
      }
    }

    const company = repository.create(companyData);
    return await repository.save(company);
  },

  async findAll() {
    const repository = AppDataSource.getRepository(Company);
    return await repository.find({
      order: {
        createdAt: "DESC",
      },
    });
  },

  async findById(id: string) {
    const repository = AppDataSource.getRepository(Company);
    return await repository.findOne({ where: { id } });
  },

  async update(id: string, companyData: Partial<Company>): Promise<Company> {
    const repository = AppDataSource.getRepository(Company);
    await repository.update(id, companyData);

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
