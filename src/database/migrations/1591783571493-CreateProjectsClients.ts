import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProjectsClients1591783571493
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients_project_projects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'projectsId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'clientsId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'clients_project_projects',
      new TableForeignKey({
        name: 'ProjectClient',
        columnNames: ['projectsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'clients_project_projects',
      new TableForeignKey({
        name: 'ClientProject',
        columnNames: ['clientsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'clients_project_projects',
      'ClientProject',
    );

    await queryRunner.dropForeignKey(
      'clients_project_projects',
      'ProjectClient',
    );

    await queryRunner.dropTable('clients_project_projects');
  }
}
