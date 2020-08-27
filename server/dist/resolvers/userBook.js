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
exports.UserBookResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Book_1 = require("../entities/Book");
const UserBook_1 = require("../entities/UserBook");
const isAuth_1 = require("../middleware/isAuth");
let UserBookOptions = class UserBookOptions {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserBookOptions.prototype, "readingStatus", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UserBookOptions.prototype, "bookId", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], UserBookOptions.prototype, "favorited", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UserBookOptions.prototype, "rating", void 0);
UserBookOptions = __decorate([
    type_graphql_1.InputType()
], UserBookOptions);
let MyBooksQueries = class MyBooksQueries {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], MyBooksQueries.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], MyBooksQueries.prototype, "favorited", void 0);
MyBooksQueries = __decorate([
    type_graphql_1.InputType()
], MyBooksQueries);
let UserBookResolver = class UserBookResolver {
    myBooks({ req }, queries) {
        const where = { userId: req.session.userId };
        if (queries && queries.status) {
            where.readingStatus = queries.status;
        }
        if (queries && queries.favorited) {
            where.favorited = queries.favorited;
        }
        return UserBook_1.UserBook.find({
            where: where,
            relations: ["book"],
        });
    }
    myBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserBook_1.UserBook.findOne(id, { relations: ["book"] });
        });
    }
    createUserBook(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.Book.findOne(options.bookId);
            const userBook = yield UserBook_1.UserBook.findOne({
                where: { bookId: book.id, userId: req.session.userId },
                relations: ["book"],
            });
            if (userBook)
                return userBook;
            return UserBook_1.UserBook.create(Object.assign(Object.assign({}, options), { userId: req.session.userId, book })).save();
        });
    }
    updateUserBook(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield UserBook_1.UserBook.findOne(id, { relations: ["book"] });
            if (!book)
                return null;
            if (typeof options.readingStatus !== "undefined") {
                book.readingStatus = options.readingStatus;
            }
            if (typeof options.favorited !== "undefined")
                book.favorited = options.favorited;
            if (typeof options.rating !== "undefined")
                book.rating = options.rating;
            yield book.save();
            return book;
        });
    }
    deleteUserBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserBook_1.UserBook.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [UserBook_1.UserBook]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("queries", () => MyBooksQueries, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MyBooksQueries]),
    __metadata("design:returntype", Promise)
], UserBookResolver.prototype, "myBooks", null);
__decorate([
    type_graphql_1.Query(() => UserBook_1.UserBook, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserBookResolver.prototype, "myBook", null);
__decorate([
    type_graphql_1.Mutation(() => UserBook_1.UserBook),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("options", () => UserBookOptions)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserBookOptions, Object]),
    __metadata("design:returntype", Promise)
], UserBookResolver.prototype, "createUserBook", null);
__decorate([
    type_graphql_1.Mutation(() => UserBook_1.UserBook, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("options", () => UserBookOptions)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UserBookOptions]),
    __metadata("design:returntype", Promise)
], UserBookResolver.prototype, "updateUserBook", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserBookResolver.prototype, "deleteUserBook", null);
UserBookResolver = __decorate([
    type_graphql_1.Resolver()
], UserBookResolver);
exports.UserBookResolver = UserBookResolver;
//# sourceMappingURL=userBook.js.map