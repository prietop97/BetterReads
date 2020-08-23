import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { BookResolver } from "./resolvers/book";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__, COOKIE_NAME } from "./constants";
import cors from "cors";
import { createConnection } from "typeorm";
import { Book } from "./entities/Book";
import { User } from "./entities/User";
import { Bookshelf } from "./entities/Bookshelf";
import { UserBook } from "./entities/UserBook";
import { BookshelvesUserBook } from "./entities/BookshelvesUserBook";
import { UserBookResolver } from "./resolvers/userBook";

const main = async () => {
  // SETTING UP DATABASE AND MIGRATING
  await createConnection({
    type: "postgres",
    database: "betterreads",
    username: "postgres",
    password: "Blackbox123",
    logging: true,
    synchronize: true,
    entities: [Book, User, Bookshelf, UserBook, BookshelvesUserBook],
  });
  // SETTING UP REDIS STORE FOR USER SESSIONS
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  // SETTING SESSIONS SETTINGS
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works with https
      },
      saveUninitialized: false,
      secret: "sadasdasdasd",
      resave: false,
    })
  );

  // CREATING THE APOLLO SERVER, THIS IS WHERE RESOLVERS RESIDE.
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, BookResolver, UserResolver, UserBookResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((err) => console.log(err));
