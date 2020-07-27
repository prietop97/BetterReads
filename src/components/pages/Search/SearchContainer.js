import React, { useContext } from "react";

import SearchContext from "../../../state/context/SearchContext";

import { List, SearchBar, Header } from "../../common";
import { Flex } from "@chakra-ui/core";
import RenderSearchPage from "./RenderSearchPage";
import Container from "../../common/Container";

const SearchResultsList = () => {
  const searchContext = useContext(SearchContext);
  const { bookResults, isFetching } = searchContext.searchState;
  const { getMoreBooks } = searchContext;
  console.log("RUNNING");
  return (
    <>
      <Header />
      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />
      <Container>
        <Flex justifyContent="space-between">
          {bookResults.length ? (
            <>
              <List
                LoadingComponent={() => <div>Loading results...</div>}
                RenderItems={RenderSearchPage}
                items={bookResults}
                isFetching={isFetching}
              />
            </>
          ) : (
            <div>Nothing to search for. Try again.</div>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default SearchResultsList;
