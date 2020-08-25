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
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { Bookshelf } from "../entities/Bookshelf";
import { BookshelvesUserBook } from "../entities/BookshelvesUserBook";
import { UserBook } from "../entities/UserBook";

@InputType()
class BookshelfOptions {
  @Field(() => String, { nullable: true })
  name!: string;
}

@Resolver()
export class BookshelfResolver {
  @Query(() => [Bookshelf], { nullable: true })
  @UseMiddleware(isAuth)
  async myBookshelves(@Ctx() { req }: MyContext): Promise<Bookshelf[]> {
    const bookshelves = await Bookshelf.find({
      where: { userId: req.session.userId },
      relations: [
        "bookshelvesUserBooks",
        "bookshelvesUserBooks.userBook",
        "bookshelvesUserBooks.userBook.book",
      ],
    });
    console.log(bookshelves[0].bookshelvesUserBooks[0].userBook.book);
    return bookshelves;
  }

  @Query(() => Bookshelf, { nullable: true })
  async myBookshelf(@Arg("name") name: string): Promise<Bookshelf | undefined> {
    return Bookshelf.findOne({
      where: { name },
      relations: [
        "bookshelvesUserBooks",
        "bookshelvesUserBooks.userBook",
        "bookshelvesUserBooks.userBook.book",
      ],
    });
  }

  @Mutation(() => Bookshelf)
  @UseMiddleware(isAuth)
  async createBookshelf(
    @Arg("options", () => BookshelfOptions) options: BookshelfOptions,
    @Ctx() { req }: MyContext
  ): Promise<Bookshelf> {
    return Bookshelf.create({
      ...options,
      userId: req.session.userId,
    }).save();
  }

  @Mutation(() => Bookshelf)
  async addBookToBookshelf(
    @Arg("id") id: number,
    @Arg("userBookId") bookId: number
  ): Promise<Bookshelf | undefined> {
    await BookshelvesUserBook.create({
      bookshelfId: id,
      userBookId: bookId,
    }).save();
    return Bookshelf.findOne(id, { relations: ["bookshelvesUserBooks"] });
  }

  @Mutation(() => Bookshelf)
  async removeBookToBookshelf(
    @Arg("id") id: number,
    @Arg("userBookId") bookId: number
  ): Promise<Bookshelf | undefined> {
    await BookshelvesUserBook.delete({
      bookshelfId: id,
      userBookId: bookId,
    });
    return Bookshelf.findOne(id, { relations: ["bookshelvesUserBooks"] });
  }

  @Mutation(() => Bookshelf, { nullable: true })
  async updateBookshelf(
    @Arg("id") id: number,
    @Arg("options", () => BookshelfOptions) options: BookshelfOptions
  ): Promise<Bookshelf | null> {
    const bookshelf = await Bookshelf.findOne(id, {
      relations: ["bookshelvesUserBooks"],
    });
    if (!bookshelf) return null;
    if (typeof options.name !== "undefined") bookshelf.name = options.name;
    await bookshelf.save();
    return bookshelf;
  }

  @Mutation(() => Boolean)
  async deleteBookshelf(@Arg("id") id: number): Promise<boolean> {
    await Bookshelf.delete(id);
    return true;
  }
}
