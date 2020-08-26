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
  bookshelfId?: number;

  @Field(() => Number, { nullable: true })
  @PrimaryColumn()
  userBookId?: number;

  @Field(() => UserBook, { nullable: true })
  @ManyToOne(() => UserBook, (book) => book.bookshelvesUserBooks, {
    onDelete: "CASCADE",
  })
  userBook!: UserBook;

  @Field(() => Bookshelf, { nullable: true })
  @ManyToOne(() => Bookshelf, (book) => book.bookshelvesUserBooks, {
    onDelete: "CASCADE",
  })
  bookshelf: Bookshelf;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
