"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const book_1 = require("./resolvers/book");
const user_1 = require("./resolvers/user");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const userBook_1 = require("./resolvers/userBook");
const bookshelf_1 = require("./resolvers/bookshelf");
const typeormConfig_1 = __importDefault(require("./typeormConfig"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    yield typeorm_1.createConnection(typeormConfig_1.default);
    console.log(process.env.REDIS_URL);
    const RedisStore = connect_redis_1.default(express_session_1.default);
    let clientSettings = undefined;
    if (constants_1.__prod__)
        clientSettings = { url: process.env.REDIS_URL };
    const redisClient = redis_1.default.createClient(clientSettings);
    redisClient.on("connect", () => console.log("Connected to redis"));
    const app = express_1.default();
    app.use(cors_1.default({
        credentials: true,
        origin: [
            "https://better-reads.vercel.app",
            "http://localhost:3000",
            "https://better-reads-niheif6qc.vercel.app",
            "https://better-reads-*",
        ],
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
            url: clientSettings === null || clientSettings === void 0 ? void 0 : clientSettings.url,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET || "super secret key",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                hello_1.HelloResolver,
                bookshelf_1.BookshelfResolver,
                book_1.BookResolver,
                user_1.UserResolver,
                userBook_1.UserBookResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server started on localhost:${PORT}`);
    });
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map