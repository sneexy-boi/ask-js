import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740343668377 implements MigrationInterface {
    name = 'Migration1740343668377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" character varying NOT NULL, "token" character varying NOT NULL, "user" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ask" ("id" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "code" character varying NOT NULL, "creator" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_d5060cd0ad3d8db27dc0ec98a86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "used"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "displayName" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "prompt" character varying`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "used" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "creator" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "cw" character varying`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "nickname" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "nickname"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "cw"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "ask" DROP COLUMN "used"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "prompt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "displayName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "creator" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ask" ADD "used" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "ask"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
