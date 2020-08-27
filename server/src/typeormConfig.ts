import { Book } from "./entities/Book";
import { User } from "./entities/User";
import { Bookshelf } from "./entities/Bookshelf";
import { UserBook } from "./entities/UserBook";
import { BookshelvesUserBook } from "./entities/BookshelvesUserBook";
import { ConnectionOptions } from "typeorm";

let config: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: true,
  synchronize: true,
  entities: [Book, User, Bookshelf, UserBook, BookshelvesUserBook],
};

if (process.env.NODE_ENV !== "production") {
  config = {
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Book, User, Bookshelf, UserBook, BookshelvesUserBook],
  };
}

export default config;
