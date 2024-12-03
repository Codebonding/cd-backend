import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCompanyTable1733228717244 implements MigrationInterface {
    name = 'UpdatedCompanyTable1733228717244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`role\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`role\``);
    }

}
