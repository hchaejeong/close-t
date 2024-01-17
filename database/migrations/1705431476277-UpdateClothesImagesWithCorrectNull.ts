import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClothesImagesWithCorrectNull1705431476277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "codi"
            SET "clothesImages" = array_replace("clothesImages", NULL, 'null')
            WHERE 'null' = ANY("clothesImages");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
