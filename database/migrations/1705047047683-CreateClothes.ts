import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateClothes1705047047683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.createTable(
            new Table({
                name: 'clothes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        length: '25',
                    },
                    {
                        name: 'styles',
                        type: 'varchar',
                        length: '100',
                        isArray: true,
                    }, 
                    {
                        name: 'tag',
                        type: 'varchar',
                        length: '25',
                        isArray: true,
                        isNullable: true,
                    },
                    {
                        name: 'imageUrl',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'link',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: 'userId',
                        type: 'varchar',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey('clothes', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('clothes');
        const userIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);

        if (userIdForeignKey) {
            await queryRunner.dropForeignKey('clothes', userIdForeignKey);
        }
        await queryRunner.dropTable('clothes');
    }

}
