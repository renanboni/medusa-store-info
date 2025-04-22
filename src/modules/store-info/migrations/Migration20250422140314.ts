import { Migration } from '@mikro-orm/migrations';

export class Migration20250422140314 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "store_info" add column if not exists "type" text check ("type" in ('text', 'markdown')) not null default 'text';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "store_info" drop column if exists "type";`);
  }

}
