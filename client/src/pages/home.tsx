import React from "react";
import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";
import { SearchBooks } from "../components/SearchBooks";
import { HomeLibrary } from "../components/HomeLibrary";
import { Wrapper } from "../components/Wrapper";
import { Shelves } from "../components/Shelves";
import { Flex, Box } from "@chakra-ui/core";
import { PageLayout } from "../components/PageLayout";
import { useMyBooksQuery } from "../generated/graphql";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  const { data, loading } = useMyBooksQuery();
  const toRead = data?.myBooks.filter((x) => x.readingStatus === "To Be Read");
  const reading = data?.myBooks.filter((x) => x.readingStatus === "Reading");
  return (
    <>
      <NavBar />
      <SearchBooks />
      <PageLayout>
        <HomeLibrary library="Reading" books={reading} />
        <HomeLibrary library="To Read" books={toRead} />
      </PageLayout>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
