import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClothesImagesNull1705424041045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "codi"
            SET "clothesImages" = "clothesImages"
            WHERE array_position("clothesImages", NULL) IS NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "codi"
            ALTER COLUMN "clothesImages" TYPE varchar(100)[] USING "clothesImages"::varchar(100)[];
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "codi" ALTER COLUMN "clothesIds" TYPE varchar[]`);
    }

}
