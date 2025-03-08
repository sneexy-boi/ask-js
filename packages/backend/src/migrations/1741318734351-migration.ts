import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741318734351 implements MigrationInterface {
	name = 'Migration1741318734351';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_f02a17d3dee122081e8adc4bc96"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" RENAME COLUMN "replyingToId" TO "commentingToId"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_63d4d01a0e79fd5d51ee7c2c659" FOREIGN KEY ("commentingToId") REFERENCES "ask"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_63d4d01a0e79fd5d51ee7c2c659"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" RENAME COLUMN "commentingToId" TO "replyingToId"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_f02a17d3dee122081e8adc4bc96" FOREIGN KEY ("replyingToId") REFERENCES "ask"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
