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
exports.BookResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Book_1 = require("../entities/Book");
const isAuth_1 = require("../middleware/isAuth");
let Options = class Options {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Options.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Options.prototype, "googleId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Options.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Options.prototype, "thumbnail", void 0);
Options = __decorate([
    type_graphql_1.InputType()
], Options);
let BookResolver = class BookResolver {
    books() {
        return Book_1.Book.find();
    }
    book(id) {
        return Book_1.Book.findOne(id);
    }
    createBook(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.Book.findOne({ where: { googleId: options.googleId } });
            if (book)
                return book;
            return Book_1.Book.create(options).save();
        });
    }
    updateBook(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.Book.findOne(id);
            if (!book)
                return null;
            if (typeof options.title !== "undefined")
                book.title = options.title;
            if (typeof options.author !== "undefined")
                book.author = options.author;
            if (typeof options.thumbnail !== "undefined")
                book.thumbnail = options.thumbnail;
            yield Book_1.Book.update(id, book);
            return book;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Book_1.Book.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Book_1.Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "books", null);
__decorate([
    type_graphql_1.Query(() => Book_1.Book, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "book", null);
__decorate([
    type_graphql_1.Mutation(() => Book_1.Book),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("options", () => Options)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Options]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "createBook", null);
__decorate([
    type_graphql_1.Mutation(() => Book_1.Book, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("options", () => Options)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Options]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "updateBook", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
BookResolver = __decorate([
    type_graphql_1.Resolver()
], BookResolver);
exports.BookResolver = BookResolver;
//# sourceMappingURL=book.js.map