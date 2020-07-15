import React from "react";
import { useHistory } from "react-router-dom";
import { bookSearch } from "../../../api";

import { List, SearchBar } from "../../common";
import RenderSearchPage from "./RenderSearchPage";

const SearchResultsList = () => {
  const history = useHistory();

  // const bookQuery = history.location.query;
  const bookQuery = "harry+potter";

  return (
    <>
      <p>
        <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />
      </p>
      <List
        getItemsData={() => bookSearch(bookQuery)}
        LoadingComponent={() => <div>Loading results...</div>}
        RenderItems={RenderSearchPage}
      />
    </>
  );
};

export default SearchResultsList;
