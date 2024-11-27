import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1732705537712 implements MigrationInterface {
    name = 'Users1732705537712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`department\` varchar(255) NULL, \`degree\` varchar(255) NULL, \`passedOutYear\` int NULL, \`address\` varchar(255) NULL, \`district\` varchar(255) NULL, \`state\` varchar(255) NULL, \`pinCode\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
