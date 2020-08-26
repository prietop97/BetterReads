import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { BookshelvesUserBook } from "./BookshelvesUserBook";

@ObjectType()
@Entity()
export class Bookshelf extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.bookshelves)
  user!: User;

  @Field(() => [BookshelvesUserBook])
  @OneToMany(() => BookshelvesUserBook, (bu) => bu.bookshelf, {
    onDelete: "CASCADE",
  })
  bookshelvesUserBooks: BookshelvesUserBook[];
}
