import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const url = "https://betterreads-gql.herokuapp.com/graphql";
const dev = "http://localhost:4000/graphql";
export const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: dev,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined" ? ctx.req?.headers.cookie : undefined) ||
        "",
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
