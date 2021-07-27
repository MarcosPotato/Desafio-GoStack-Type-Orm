import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCategoryIdToTransactions1614640378758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('Transactions', new TableColumn({
            name: 'category_id',
            type: 'uuid',
            isNullable: true
        }))

        await queryRunner.createForeignKey('Transactions', new TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Category',
            name: 'TransactionCategory',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })) 
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('Tansactions', 'TransactionCategory')
        await queryRunner.dropColumn('Transactions', 'category_id')
    }

}
