import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741057689270 implements MigrationInterface {
    name = 'Migration1741057689270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "approved" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "approved"`);
    }

}
