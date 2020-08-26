import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { Book } from "../entities/Book";
import { UserBook } from "../entities/UserBook";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { ObjectLiteral, FindConditions } from "typeorm";

@InputType()
class UserBookOptions {
  @Field(() => String, { nullable: true })
  readingStatus!: string;
  @Field(() => Number, { nullable: true })
  bookId!: number;
  @Field(() => Boolean, { nullable: true })
  favorited!: boolean;
  @Field(() => Number, { nullable: true })
  rating!: number;
}
@InputType()
class MyBooksQueries {
  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => Boolean, { nullable: true })
  favorited?: boolean;
}

@Resolver()
export class UserBookResolver {
  @Query(() => [UserBook])
  @UseMiddleware(isAuth)
  myBooks(
    @Ctx() { req }: MyContext,
    @Arg("queries", () => MyBooksQueries, { nullable: true })
    queries: MyBooksQueries
  ): Promise<UserBook[]> {
    const where:
      | string
      | ObjectLiteral
      | FindConditions<UserBook>
      | FindConditions<UserBook>[]
      | undefined = { userId: req.session.userId };
    if (queries && queries.status) {
      where.readingStatus = queries.status;
    }
    if (queries && queries.favorited) {
      where.favorited = queries.favorited;
    }
    return UserBook.find({
      where: where,
      relations: ["book"],
    });
  }

  @Query(() => UserBook, { nullable: true })
  @UseMiddleware(isAuth)
  async myBook(@Arg("id") id: number): Promise<UserBook | undefined> {
    return UserBook.findOne(id, { relations: ["book"] });
  }

  @Mutation(() => UserBook)
  @UseMiddleware(isAuth)
  async createUserBook(
    @Arg("options", () => UserBookOptions) options: UserBookOptions,
    @Ctx() { req }: MyContext
  ): Promise<UserBook> {
    const book = await Book.findOne(options.bookId);
    const userBook = await UserBook.findOne({
      where: { bookId: book!.id, userId: req.session.userId },
      relations: ["book"],
    });
    if (userBook) return userBook;
    return UserBook.create({
      ...options,
      userId: req.session.userId,
      book,
    }).save();
  }

  @Mutation(() => UserBook, { nullable: true })
  @UseMiddleware(isAuth)
  async updateUserBook(
    @Arg("id") id: number,
    @Arg("options", () => UserBookOptions) options: UserBookOptions
  ): Promise<UserBook | null> {
    const book = await UserBook.findOne(id, { relations: ["book"] });
    if (!book) return null;
    if (typeof options.readingStatus !== "undefined") {
      book.readingStatus = options.readingStatus;
    }
    if (typeof options.favorited !== "undefined")
      book.favorited = options.favorited;
    if (typeof options.rating !== "undefined") book.rating = options.rating;
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUserBook(@Arg("id") id: number): Promise<boolean> {
    await UserBook.delete(id);
    return true;
  }
}
