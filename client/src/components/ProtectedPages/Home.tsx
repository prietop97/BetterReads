import React from "react";
import { NavBar } from "../NavBar";
import { SearchBooks } from "../SearchBooks";
import { HomeLibrary } from "../HomeLibrary";
import { PageLayout } from "../PageLayout";
import { useMyBooksQuery } from "../../generated/graphql";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  const { data } = useMyBooksQuery();
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
export default Home;
