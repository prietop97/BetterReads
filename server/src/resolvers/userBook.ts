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

@Resolver()
export class UserBookResolver {
  @Query(() => [UserBook])
  @UseMiddleware(isAuth)
  myBooks(@Ctx() { req }: MyContext): Promise<UserBook[]> {
    return UserBook.find({
      where: { userId: req.session.userId },
      relations: ["book"],
    });
  }

  @Query(() => UserBook, { nullable: true })
  async myBook(@Arg("id") id: number): Promise<UserBook | undefined> {
    return UserBook.findOne(id, { relations: ["book"] });
  }

  @Mutation(() => UserBook)
  async createUserBook(
    @Arg("options", () => UserBookOptions) options: UserBookOptions,
    @Ctx() { req }: MyContext
  ): Promise<UserBook> {
    const book = await Book.findOne(options.bookId);
    return UserBook.create({
      ...options,
      userId: req.session.userId,
      book,
    }).save();
  }

  @Mutation(() => UserBook, { nullable: true })
  async updateUserBook(
    @Arg("id") id: number,
    @Arg("options", () => UserBookOptions) options: UserBookOptions
  ): Promise<UserBook | null> {
    const book = await UserBook.findOne(id, { relations: ["book"] });
    if (!book) return null;
    if (typeof options.readingStatus !== "undefined")
      book.readingStatus = options.readingStatus;
    if (typeof options.favorited !== "undefined")
      book.favorited = options.favorited;
    if (typeof options.rating !== "undefined") book.rating = options.rating;
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteUserBook(@Arg("id") id: number): Promise<boolean> {
    await UserBook.delete(id);
    return true;
  }
}
