import React from "react";
import { useHistory } from "react-router-dom";
import { bookSearch } from "../../../api";

import { List, SearchBar, Header } from "../../common";
import RenderSearchPage from "./RenderSearchPage";

const SearchResultsList = () => {
  const history = useHistory();

  let bookQuery = "harry+potter";
  if (history.location.query !== undefined) {
    bookQuery = history.location.query;
  }

  return (
    <>
      <Header />
      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />

      <List
        getItemsData={() => bookSearch(bookQuery)}
        LoadingComponent={() => <div>Loading results...</div>}
        RenderItems={RenderSearchPage}
      />
    </>
  );
};

export default SearchResultsList;
