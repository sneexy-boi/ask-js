import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740358273302 implements MigrationInterface {
    name = 'Migration1740358273302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ask" ADD "visibility" character varying NOT NULL DEFAULT 'public'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "visibility"`);
    }

}
