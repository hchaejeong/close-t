import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCodi1705047451520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.createTable(
            new Table({
                name: 'codi',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'styles',
                        type: 'varchar',
                        length: '100',
                        isArray: true,
                    },
                    {
                        name: 'like',
                        type: 'varchar',
                        length: '25',
                    },
                    {
                        name: 'clothesIds',
                        type: 'uuid',
                        isArray: true,
                    },
                    {
                        name: 'clothesImages',
                        type: 'varchar',
                        length: '100',
                        isArray: true,
                    }, 
                    {
                        name: 'comment',
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

        await queryRunner.createForeignKey('codi', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('codi');
        const userIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);

        if (userIdForeignKey) {
            await queryRunner.dropForeignKey('codi', userIdForeignKey);
        }
        await queryRunner.dropTable('codi');
    }

}
