import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEvents1717337209860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adding the id column

    // Adding enum constraint
    await queryRunner.query(`
      INSERT INTO "events" ("name")
      VALUES 
        ('Status changed'),
        ('Task created')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the columns and constraints

    await queryRunner.dropColumn('events', 'name');
    await queryRunner.dropColumn('events', 'id');
  }
}
