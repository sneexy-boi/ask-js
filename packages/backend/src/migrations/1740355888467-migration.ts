import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740355888467 implements MigrationInterface {
	name = 'Migration1740355888467';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "ask" ADD "response" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "response"`);
	}
}
