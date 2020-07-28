import React, { useContext } from "react";

import SearchContext from "../../../state/context/SearchContext";

import { List, SearchBar, Header } from "../../common";
import { Flex, Box, Text } from "@chakra-ui/core";
import RenderSearchPage from "./RenderSearchPage";
import Container from "../../common/Container";
import BooksPreviewLoading from "./BooksPreviewLoading";
import Breadcrumb from "../../common/BreadCrumb";

const SearchResultsList = () => {
  const searchContext = useContext(SearchContext);
  const {
    bookResults,
    isFetching,
    totalBooks,
    bookQuery
  } = searchContext.searchState;
  const { getMoreBooks } = searchContext;
  console.log("RUNNING");
  return (
    <>
      <Header />
      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />
      {/* <Breadcrumb /> */}
      <Box
        bg="#f3f3f3"
        width="100%"
        m="1rem 0"
        padding="0.5rem 0"
        color="black"
      >
        <Box m="0 3%" display="flex" alignItems="center">
          <Text color="black">
            {totalBooks
              ? `${totalBooks} results for "${bookQuery}"`
              : "Search for your favorite book or author"}
          </Text>
        </Box>
      </Box>
      <Container>
        <Flex justifyContent="space-between">
          {isFetching ? (
            <BooksPreviewLoading />
          ) : (
            <RenderSearchPage data={bookResults} />
          )}
        </Flex>
      </Container>
    </>
  );
};

export default SearchResultsList;
