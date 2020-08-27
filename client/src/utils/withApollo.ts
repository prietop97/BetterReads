import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/graphql"
    : "https://betterreads-gql.herokuapp.com/graphql";
export const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: url,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined" ? ctx.req?.headers.cookie : undefined) ||
        "",
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
