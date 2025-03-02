import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740343719757 implements MigrationInterface {
	name = 'Migration1740343719757';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "invite" ("id" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "code" character varying NOT NULL, "creator" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "user_private" ("id" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e6bf0ac016c44867edaaeeccec3" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
		await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "used"`);
		await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "code"`);
		await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "creator"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "ask" ADD "creator" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "ask" ADD "code" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "ask" ADD "used" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "password" character varying NOT NULL`
		);
		await queryRunner.query(`DROP TABLE "user_private"`);
		await queryRunner.query(`DROP TABLE "invite"`);
	}
}
