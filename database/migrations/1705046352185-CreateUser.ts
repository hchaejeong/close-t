import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1705046352185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
                        length: '100',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'profileImage',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                        length: '25',
                    },
                    {
                        name: 'age',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'height',
                        type: 'int',
                        isNullable: true,
                    }, 
                    {
                        name: 'bodyType',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'styles',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                        isArray: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
