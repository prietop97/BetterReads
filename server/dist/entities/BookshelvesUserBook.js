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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookshelvesUserBook = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const UserBook_1 = require("./UserBook");
const Bookshelf_1 = require("./Bookshelf");
let BookshelvesUserBook = class BookshelvesUserBook extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], BookshelvesUserBook.prototype, "bookshelfId", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], BookshelvesUserBook.prototype, "userBookId", void 0);
__decorate([
    type_graphql_1.Field(() => UserBook_1.UserBook, { nullable: true }),
    typeorm_1.ManyToOne(() => UserBook_1.UserBook, (book) => book.bookshelvesUserBooks, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", UserBook_1.UserBook)
], BookshelvesUserBook.prototype, "userBook", void 0);
__decorate([
    type_graphql_1.Field(() => Bookshelf_1.Bookshelf, { nullable: true }),
    typeorm_1.ManyToOne(() => Bookshelf_1.Bookshelf, (book) => book.bookshelvesUserBooks, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Bookshelf_1.Bookshelf)
], BookshelvesUserBook.prototype, "bookshelf", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], BookshelvesUserBook.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], BookshelvesUserBook.prototype, "updatedAt", void 0);
BookshelvesUserBook = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], BookshelvesUserBook);
exports.BookshelvesUserBook = BookshelvesUserBook;
//# sourceMappingURL=BookshelvesUserBook.js.map