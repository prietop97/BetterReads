import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  UseMiddleware,
  Ctx,
  ObjectType,
  Float,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { Bookshelf } from "../entities/Bookshelf";
import { BookshelvesUserBook } from "../entities/BookshelvesUserBook";

@InputType()
class BookshelfOptions {
  @Field(() => String, { nullable: true })
  name!: string;
}

@ObjectType()
class BookshelfFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class BookshelfResponse {
  @Field(() => [BookshelfFieldError], { nullable: true })
  errors?: BookshelfFieldError[];

  @Field(() => Bookshelf, { nullable: true })
  bookshelf?: Bookshelf;
}

@Resolver()
export class BookshelfResolver {
  @Query(() => [Bookshelf], { nullable: true })
  async myBookshelves(@Ctx() { req }: MyContext): Promise<Bookshelf[]> {
    const bookshelves = await Bookshelf.find({
      where: { userId: req.session.userId },
      relations: [
        "bookshelvesUserBooks",
        "bookshelvesUserBooks.userBook",
        "bookshelvesUserBooks.userBook.book",
      ],
    });
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

  @Mutation(() => BookshelfResponse)
  async createBookshelf(
    @Arg("options", () => BookshelfOptions) options: BookshelfOptions,
    @Ctx() { req }: MyContext
  ): Promise<BookshelfResponse> {
    if (!options.name) {
      return {
        errors: [
          {
            field: "name",
            message: "Please enter a valid shelf name",
          },
        ],
      };
    }
    const bookshelf = await Bookshelf.findOne({
      where: {
        name: options.name,
        userId: req.session.userId,
      },
    });
    if (bookshelf) {
      return {
        errors: [
          {
            field: "name",
            message: "You already have a bookshelf with this name",
          },
        ],
      };
    }
    return {
      bookshelf: await Bookshelf.create({
        ...options,
        userId: req.session.userId,
        bookshelvesUserBooks: [],
      }).save(),
    };
  }

  @Mutation(() => Boolean)
  async addBookToBookshelf(
    @Arg("id") id: number,
    @Arg("userBooksIds", () => [Float]) booksId: number[]
  ): Promise<boolean> {
    const promises = booksId.map((x) =>
      BookshelvesUserBook.insert({ userBookId: x, bookshelfId: id })
    );
    await Promise.all(promises);
    return true;
  }

  @Mutation(() => Boolean)
  async removeBooksFromBookshelf(
    @Arg("id") id: number,
    @Arg("userBooksIds", () => [Float]) booksId: number[]
  ): Promise<boolean> {
    const promises = booksId.map((x) =>
      BookshelvesUserBook.delete({ userBookId: x, bookshelfId: id })
    );
    await Promise.all(promises);
    return true;
  }

  @Mutation(() => BookshelfResponse, { nullable: true })
  async updateBookshelf(
    @Arg("id") id: number,
    @Arg("options", () => BookshelfOptions) options: BookshelfOptions,
    @Ctx() { req }: MyContext
  ): Promise<BookshelfResponse | null> {
    const bookshelf = await Bookshelf.findOne(id, {
      relations: ["bookshelvesUserBooks"],
    });
    if (!bookshelf)
      return {
        errors: [{ field: "Id", message: "No bookshelf found" }],
      };
    const anotherBookshelf = await Bookshelf.findOne({
      where: { name: options.name, userId: req.session.userId },
    });
    if (anotherBookshelf && anotherBookshelf.id !== bookshelf.id) {
      return {
        errors: [
          {
            field: "name",
            message: "You already have a bookshelf with this name",
          },
        ],
      };
    }
    bookshelf.name = options.name;
    await bookshelf.save();
    return { bookshelf };
  }

  @Mutation(() => Boolean)
  async deleteBookshelf(@Arg("id") id: number): Promise<boolean> {
    await Bookshelf.delete(id);
    return true;
  }
}
