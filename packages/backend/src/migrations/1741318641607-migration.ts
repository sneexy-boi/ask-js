import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741318641607 implements MigrationInterface {
	name = 'Migration1741318641607';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "comment" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "replyingToId" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_f02a17d3dee122081e8adc4bc96" FOREIGN KEY ("replyingToId") REFERENCES "ask"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_f02a17d3dee122081e8adc4bc96"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`
		);
		await queryRunner.query(`DROP TABLE "comment"`);
	}
}
