import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741309797820 implements MigrationInterface {
    name = 'Migration1741309797820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reply" ("id" character varying NOT NULL, "user" character varying NOT NULL, "replyingToId" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_94fa9017051b40a71e000a2aff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_cc1209696dfe2a7be628548c30c" FOREIGN KEY ("replyingToId") REFERENCES "ask"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_cc1209696dfe2a7be628548c30c"`);
        await queryRunner.query(`DROP TABLE "reply"`);
    }

}
