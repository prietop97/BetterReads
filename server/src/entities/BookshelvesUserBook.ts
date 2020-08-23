import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { UserBook } from "./UserBook";
import { Bookshelf } from "./Bookshelf";

@ObjectType()
@Entity()
export class BookshelvesUserBook extends BaseEntity {
  @Field()
  @PrimaryColumn()
  bookshelfId: number;

  @Field()
  @PrimaryColumn()
  userBookId: number;

  @Field(() => UserBook)
  @ManyToOne(() => UserBook, (book) => book.bookshelvesUserBooks)
  userBook: UserBook;

  @Field(() => Bookshelf)
  @ManyToOne(() => Bookshelf, (book) => book.bookshelvesUserBooks)
  bookshelf: Bookshelf;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
