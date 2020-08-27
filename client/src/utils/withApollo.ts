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
      cookie: ctx.req?.headers.cookie || "",
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
