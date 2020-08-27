"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookshelfResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const Bookshelf_1 = require("../entities/Bookshelf");
const BookshelvesUserBook_1 = require("../entities/BookshelvesUserBook");
let BookshelfOptions = class BookshelfOptions {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], BookshelfOptions.prototype, "name", void 0);
BookshelfOptions = __decorate([
    type_graphql_1.InputType()
], BookshelfOptions);
let BookshelfFieldError = class BookshelfFieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BookshelfFieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BookshelfFieldError.prototype, "message", void 0);
BookshelfFieldError = __decorate([
    type_graphql_1.ObjectType()
], BookshelfFieldError);
let BookshelfResponse = class BookshelfResponse {
};
__decorate([
    type_graphql_1.Field(() => [BookshelfFieldError], { nullable: true }),
    __metadata("design:type", Array)
], BookshelfResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Bookshelf_1.Bookshelf, { nullable: true }),
    __metadata("design:type", Bookshelf_1.Bookshelf)
], BookshelfResponse.prototype, "bookshelf", void 0);
BookshelfResponse = __decorate([
    type_graphql_1.ObjectType()
], BookshelfResponse);
let BookshelfResolver = class BookshelfResolver {
    myBookshelves({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookshelves = yield Bookshelf_1.Bookshelf.find({
                where: { userId: req.session.userId },
                relations: [
                    "bookshelvesUserBooks",
                    "bookshelvesUserBooks.userBook",
                    "bookshelvesUserBooks.userBook.book",
                ],
            });
            return bookshelves;
        });
    }
    myBookshelf(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return Bookshelf_1.Bookshelf.findOne({
                where: { name },
                relations: [
                    "bookshelvesUserBooks",
                    "bookshelvesUserBooks.userBook",
                    "bookshelvesUserBooks.userBook.book",
                ],
            });
        });
    }
    createBookshelf(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const bookshelf = yield Bookshelf_1.Bookshelf.findOne({
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
                bookshelf: yield Bookshelf_1.Bookshelf.create(Object.assign(Object.assign({}, options), { userId: req.session.userId, bookshelvesUserBooks: [] })).save(),
            };
        });
    }
    addBookToBookshelf(id, booksId) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = booksId.map((x) => BookshelvesUserBook_1.BookshelvesUserBook.insert({ userBookId: x, bookshelfId: id }));
            yield Promise.all(promises);
            return true;
        });
    }
    removeBooksFromBookshelf(id, booksId) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = booksId.map((x) => BookshelvesUserBook_1.BookshelvesUserBook.delete({ userBookId: x, bookshelfId: id }));
            yield Promise.all(promises);
            return true;
        });
    }
    updateBookshelf(id, options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookshelf = yield Bookshelf_1.Bookshelf.findOne(id, {
                relations: ["bookshelvesUserBooks"],
            });
            if (!bookshelf)
                return {
                    errors: [{ field: "Id", message: "No bookshelf found" }],
                };
            const anotherBookshelf = yield Bookshelf_1.Bookshelf.findOne({
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
            yield bookshelf.save();
            return { bookshelf };
        });
    }
    deleteBookshelf(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Bookshelf_1.Bookshelf.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Bookshelf_1.Bookshelf], { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookshelfResolver.prototype, "myBookshelves", null);
__decorate([
    type_graphql_1.Query(() => Bookshelf_1.Bookshelf, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookshelfResolver.prototype, "myBookshelf", null);
__decorate([
    type_graphql_1.Mutation(() => BookshelfResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("options", () => BookshelfOptions)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookshelfOptions, Object]),
    __metadata("design:returntype", Promise)
], BookshelfResolver.prototype, "createBookshelf", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("userBooksIds", () => [type_graphql_1.Float])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], BookshelfResolver.prototype, "addBookToBookshelf", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("userBooksIds", () => [type_graphql_1.Float])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], BookshelfResolver.prototype, "removeBooksFromBookshelf", null);
__decorate([
    type_graphql_1.Mutation(() => BookshelfResponse, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("options", () => BookshelfOptions)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, BookshelfOptions, Object]),
    __metadata("design:returntype", Promise)
], BookshelfResolver.prototype, "updateBookshelf", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookshelfResolver.prototype, "deleteBookshelf", null);
BookshelfResolver = __decorate([
    type_graphql_1.Resolver()
], BookshelfResolver);
exports.BookshelfResolver = BookshelfResolver;
//# sourceMappingURL=bookshelf.js.map