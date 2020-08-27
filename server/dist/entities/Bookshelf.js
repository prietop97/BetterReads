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
exports.Bookshelf = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const BookshelvesUserBook_1 = require("./BookshelvesUserBook");
let Bookshelf = class Bookshelf extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Bookshelf.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Bookshelf.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Bookshelf.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Bookshelf.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Bookshelf.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.bookshelves),
    __metadata("design:type", User_1.User)
], Bookshelf.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [BookshelvesUserBook_1.BookshelvesUserBook]),
    typeorm_1.OneToMany(() => BookshelvesUserBook_1.BookshelvesUserBook, (bu) => bu.bookshelf, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Bookshelf.prototype, "bookshelvesUserBooks", void 0);
Bookshelf = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Bookshelf);
exports.Bookshelf = Bookshelf;
//# sourceMappingURL=Bookshelf.js.map