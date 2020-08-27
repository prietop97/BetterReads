import "reflect-metadata";
import dotenv from "dotenv";
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
import { UserBookResolver } from "./resolvers/userBook";
import { BookshelfResolver } from "./resolvers/bookshelf";
import config from "./typeormConfig";

const main = async () => {
  dotenv.config();
  // SETTING UP DATABASE AND MIGRATING
  await createConnection(config);
  // SETTING UP REDIS STORE FOR USER SESSIONS
  console.log(process.env.REDIS_URL);
  const RedisStore = connectRedis(session);
  let clientSettings: redis.ClientOpts | undefined = undefined;
  if (__prod__) clientSettings = { url: process.env.REDIS_URL };
  console.log(clientSettings);
  const redisClient = redis.createClient(clientSettings);
  redisClient.on("connect", () => console.log("Connected to redis"));
  redisClient.on("ready", () => console.log("Client connected to redis"));
  redisClient.on("error", (err) => console.log("Redis error", err));
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: [
        "https://better-reads.vercel.app",
        "http://localhost:3000",
        "https://better-reads-niheif6qc.vercel.app",
        "https://better-reads-*",
      ],
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
        // httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works with https
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET || "super secret key",
      resave: false,
    })
  );

  // CREATING THE APOLLO SERVER, THIS IS WHERE RESOLVERS RESIDE.
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        BookshelfResolver,
        BookResolver,
        UserResolver,
        UserBookResolver,
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
};

main().catch((err) => console.log(err));
