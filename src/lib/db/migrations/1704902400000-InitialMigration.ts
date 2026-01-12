import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1704902400000 implements MigrationInterface {
  name = "InitialMigration1704902400000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('user', 'admin')
        `);

    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password" character varying,
                "name" character varying NOT NULL,
                "role" "user_role_enum" NOT NULL DEFAULT 'user',
                "image" character varying,
                "emailVerified" boolean NOT NULL DEFAULT false,
                "resetToken" character varying,
                "resetTokenExpiry" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TYPE "todo_status_enum" AS ENUM('pending', 'in-progress', 'completed')
        `);

    await queryRunner.query(`
            CREATE TYPE "todo_priority_enum" AS ENUM('low', 'medium', 'high')
        `);

    await queryRunner.query(`
            CREATE TABLE "todos" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" text,
                "status" "todo_status_enum" NOT NULL DEFAULT 'pending',
                "priority" "todo_priority_enum" NOT NULL DEFAULT 'medium',
                "dueDate" TIMESTAMP,
                "userId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_todos_id" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE INDEX "IDX_todos_userId" ON "todos" ("userId")
        `);

    await queryRunner.query(`
            CREATE INDEX "IDX_todos_status" ON "todos" ("status")
        `);

    await queryRunner.query(`
            CREATE INDEX "IDX_todos_priority" ON "todos" ("priority")
        `);

    await queryRunner.query(`
            ALTER TABLE "todos" 
            ADD CONSTRAINT "FK_todos_userId" 
            FOREIGN KEY ("userId") 
            REFERENCES "users"("id") 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "FK_todos_userId"`
    );
    await queryRunner.query(`DROP INDEX "IDX_todos_priority"`);
    await queryRunner.query(`DROP INDEX "IDX_todos_status"`);
    await queryRunner.query(`DROP INDEX "IDX_todos_userId"`);
    await queryRunner.query(`DROP TABLE "todos"`);
    await queryRunner.query(`DROP TYPE "todo_priority_enum"`);
    await queryRunner.query(`DROP TYPE "todo_status_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
