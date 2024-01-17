import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClothesIdWithNullUUID1705419116681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update the type of clothesIds column
        await queryRunner.query(`
            UPDATE "codi"
            SET "clothesIds" = "clothesIds"
            WHERE array_position("clothesIds", NULL) IS NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // This is a basic down migration, modify as needed based on your rollback requirements
        await queryRunner.query(`ALTER TABLE "codi" ALTER COLUMN "clothesIds" TYPE varchar[]`);
    }
}
