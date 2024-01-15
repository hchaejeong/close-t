import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLinkColumnLength1705337442650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clothes" ALTER COLUMN "link" TYPE varchar(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clothes" ALTER COLUMN "link" TYPE varchar(100)`);
    }

}
