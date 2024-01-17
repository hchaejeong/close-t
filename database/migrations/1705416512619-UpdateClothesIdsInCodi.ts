import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClothesIdsInCodi1705416512619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "codi" ALTER COLUMN "clothesIds" TYPE varchar[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "codi" ALTER COLUMN "clothesIds" TYPE uuid[]`)
    }

}
