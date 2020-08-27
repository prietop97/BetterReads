import React from "react";
import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";
import { SearchBooks } from "../components/SearchBooks";
import { HomeLibrary } from "../components/HomeLibrary";
import { PageLayout } from "../components/PageLayout";
import { useMyBooksQuery } from "../generated/graphql";
// import { useRouter } from "next/router";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  const { data } = useMyBooksQuery();
  // const router = useRouter();
  // if (error) {
  //   console.log(error.message);
  //   router.push("/");
  // }
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
