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
import { Bookshelf } from "src/entities/Bookshelf";
import { BookshelvesUserBook } from "src/entities/BookshelvesUserBook";

@InputType()
class BookshelfOptions {
  @Field(() => String, { nullable: true })
  name!: string;
}

@Resolver()
export class BookshelfResolver {
  @Query(() => [Bookshelf])
  @UseMiddleware(isAuth)
  myBookshelves(@Ctx() { req }: MyContext): Promise<Bookshelf[]> {
    return Bookshelf.find({
      where: { userId: req.session.userId },
      relations: ["bookshelvesUserBooks"],
    });
  }

  @Query(() => Bookshelf, { nullable: true })
  async myBook(@Arg("id") id: number): Promise<Bookshelf | undefined> {
    return Bookshelf.findOne(id, { relations: ["bookshelvesUserBooks"] });
  }

  @Mutation(() => Bookshelf)
  async createUserBook(
    @Arg("options", () => BookshelfOptions) options: BookshelfOptions
  ): Promise<Bookshelf> {
    return Bookshelf.create({
      ...options,
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
  async updateUserBook(
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
  async deleteUserBook(@Arg("id") id: number): Promise<boolean> {
    await Bookshelf.delete(id);
    return true;
  }
}
