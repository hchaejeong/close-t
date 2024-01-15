import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateClothesEntity1705331807476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('clothes', [
            new TableColumn({
                name: 'like',
                type: 'varchar',
                length: '25',
                default: "'None'",
            }),
            new TableColumn({
                name: 'wish',
                type: 'varchar',
                length: '25',
                default: "'None'",
            }),
            new TableColumn({
                name: 'trash',
                type: 'varchar',
                length: '25',
                default: "'None'",
            }),
        ]);

        await queryRunner.dropColumn('clothes', 'tag');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('clothes', new TableColumn({
            name: 'tag',
            type: 'varchar',
            length: '25',
            isArray: true,
            isNullable: true,
        }));

        await queryRunner.dropColumns('clothes', ['like', 'wish', 'trash']);
    }

}
