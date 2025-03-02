import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740344913054 implements MigrationInterface {
	name = 'Migration1740344913054';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "invite" RENAME COLUMN "used" TO "usedBy"`
		);
		await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "usedBy"`);
		await queryRunner.query(
			`ALTER TABLE "invite" ADD "usedBy" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "invite" DROP COLUMN "usedBy"`);
		await queryRunner.query(
			`ALTER TABLE "invite" ADD "usedBy" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "invite" RENAME COLUMN "usedBy" TO "used"`
		);
	}
}
