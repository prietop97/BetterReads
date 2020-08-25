import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Book } from "./Book";
import { User } from "./User";
import { BookshelvesUserBook } from "./BookshelvesUserBook";

@ObjectType()
@Entity()
export class UserBook extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ default: "To Read" })
  readingStatus: string;

  @Field()
  @Column({ default: false })
  favorited: boolean;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  rating: number;

  @Field()
  @Column()
  bookId: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.userBooks)
  book: Book;

  @Field()
  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @OneToMany(() => BookshelvesUserBook, (bu) => bu.userBook, {
    onDelete: "CASCADE",
  })
  bookshelvesUserBooks: BookshelvesUserBook[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
