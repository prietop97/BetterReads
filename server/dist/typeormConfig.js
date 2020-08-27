"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("./entities/Book");
const User_1 = require("./entities/User");
const Bookshelf_1 = require("./entities/Bookshelf");
const UserBook_1 = require("./entities/UserBook");
const BookshelvesUserBook_1 = require("./entities/BookshelvesUserBook");
let config = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [Book_1.Book, User_1.User, Bookshelf_1.Bookshelf, UserBook_1.UserBook, BookshelvesUserBook_1.BookshelvesUserBook],
};
if (process.env.NODE_ENV !== "production") {
    config = {
        type: "postgres",
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [Book_1.Book, User_1.User, Bookshelf_1.Bookshelf, UserBook_1.UserBook, BookshelvesUserBook_1.BookshelvesUserBook],
    };
}
exports.default = config;
//# sourceMappingURL=typeormConfig.js.map