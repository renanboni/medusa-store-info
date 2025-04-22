import { Migration } from '@mikro-orm/migrations';

export class Migration20250422140330 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "store_info" drop constraint if exists "store_info_key_unique";`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_store_info_key_unique" ON "store_info" (key) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index if exists "IDX_store_info_key_unique";`);
  }

}
