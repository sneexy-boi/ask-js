import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741318794939 implements MigrationInterface {
	name = 'Migration1741318794939';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_63d4d01a0e79fd5d51ee7c2c659"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" RENAME COLUMN "commentingToId" TO "commentingOnId"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_b0deed4eca6d86e1de35fece18c" FOREIGN KEY ("commentingOnId") REFERENCES "ask"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_b0deed4eca6d86e1de35fece18c"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" RENAME COLUMN "commentingOnId" TO "commentingToId"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_63d4d01a0e79fd5d51ee7c2c659" FOREIGN KEY ("commentingToId") REFERENCES "ask"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
