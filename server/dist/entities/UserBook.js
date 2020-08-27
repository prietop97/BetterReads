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
exports.UserBook = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Book_1 = require("./Book");
const User_1 = require("./User");
const BookshelvesUserBook_1 = require("./BookshelvesUserBook");
let UserBook = class UserBook extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserBook.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "To Read" }),
    __metadata("design:type", String)
], UserBook.prototype, "readingStatus", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UserBook.prototype, "favorited", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserBook.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserBook.prototype, "bookId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserBook.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => Book_1.Book),
    typeorm_1.ManyToOne(() => Book_1.Book, (book) => book.userBooks),
    __metadata("design:type", Book_1.Book)
], UserBook.prototype, "book", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.books),
    __metadata("design:type", User_1.User)
], UserBook.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => BookshelvesUserBook_1.BookshelvesUserBook, (bu) => bu.userBook, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], UserBook.prototype, "bookshelvesUserBooks", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UserBook.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], UserBook.prototype, "updatedAt", void 0);
UserBook = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], UserBook);
exports.UserBook = UserBook;
//# sourceMappingURL=UserBook.js.map