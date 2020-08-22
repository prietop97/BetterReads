import { Migration } from '@mikro-orm/migrations';

export class Migration20200822171232 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "name" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
