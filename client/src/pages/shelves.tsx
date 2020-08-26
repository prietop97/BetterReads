import React from "react";
import { withApollo } from "../utils/withApollo";
import { NavBar } from "../components/NavBar";
import { SearchBooks } from "../components/SearchBooks";
import { useMyBookshelvesQuery, useMyBooksQuery } from "../generated/graphql";
import { HomeLibrary } from "../components/HomeLibrary";
import { Box } from "@chakra-ui/core";
import { PageLayout } from "../components/PageLayout";

interface shelvesProps {}

const Shelves: React.FC<shelvesProps> = ({}) => {
  const { data } = useMyBookshelvesQuery();
  const { data: anotherData } = useMyBooksQuery({ variables: undefined });
  const favorited = anotherData?.myBooks.filter((x) => x.favorited);
  const toBeRead = anotherData?.myBooks.filter(
    (x) => x.readingStatus === "To Be Read"
  );
  const reading = anotherData?.myBooks.filter(
    (x) => x.readingStatus === "Reading"
  );
  const finished = anotherData?.myBooks.filter(
    (x) => x.readingStatus === "Finished"
  );

  return (
    <>
      <NavBar />
      <SearchBooks />
      <PageLayout>
        <HomeLibrary
          library={"My Books"}
          books={anotherData?.myBooks}
          onlyImage={true}
        />
        <HomeLibrary library={"Favorites"} books={favorited} onlyImage={true} />
        <HomeLibrary library={"To be read"} books={toBeRead} onlyImage={true} />
        <HomeLibrary library={"Reading"} books={reading} onlyImage={true} />
        <HomeLibrary library={"Finished"} books={finished} onlyImage={true} />
        <Box>
          {data?.myBookshelves?.map((x) => (
            <HomeLibrary
              key={x.id}
              library={x.name}
              books={x.bookshelvesUserBooks.map((y) => y.userBook)}
              id={x.id}
              onlyImage={true}
            />
          ))}
        </Box>
      </PageLayout>
    </>
  );
};

export default withApollo({ ssr: true })(Shelves);
