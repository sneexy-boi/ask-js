import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741146497610 implements MigrationInterface {
    name = 'Migration1741146497610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."autopost_target_target_enum" AS ENUM('mastodon', 'misskey')`);
        await queryRunner.query(`CREATE TYPE "public"."autopost_target_markdown_enum" AS ENUM('none', 'standard', 'misskey')`);
        await queryRunner.query(`CREATE TABLE "autopost_target" ("id" character varying NOT NULL, "user" character varying NOT NULL, "token" character varying NOT NULL, "domain" character varying NOT NULL, "target" "public"."autopost_target_target_enum", "markdown" "public"."autopost_target_markdown_enum", "createdAt" character varying NOT NULL, "masto_clientid" character varying, "masto_clientsecret" character varying, "masto_token" character varying, "mk_clientid" character varying, "mk_clientsecret" character varying, "mk_token" character varying, CONSTRAINT "PK_ff1ca6bdd2a3245d760972e6570" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "autopost_target"`);
        await queryRunner.query(`DROP TYPE "public"."autopost_target_markdown_enum"`);
        await queryRunner.query(`DROP TYPE "public"."autopost_target_target_enum"`);
    }

}
