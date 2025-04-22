import { Migration } from '@mikro-orm/migrations';

export class Migration20250422081407 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "store_info" ("id" text not null, "key" text not null, "name" text not null, "value" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "store_info_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_store_info_deleted_at" ON "store_info" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "store_info" cascade;`);
  }

}
