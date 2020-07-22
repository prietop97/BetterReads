import React from "react";
import { useHistory } from "react-router-dom";
import { bookSearch } from "../../../api";

import { SearchContext } from "../../../state/context";

import { List, SearchBar, Header } from "../../common";
import RenderSearchPage from "./RenderSearchPage";

const SearchResultsList = () => {
  const history = useHistory();
  // console.log('history', history)
  // let bookQuery = "harry+potter";
  const bookQuery = history.location.query;

  return (
    <>
      <Header />
      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />

      <SearchContext.Consumer>
        {value => {
          console.log(value);
          return (
            <List
              getItemsData={() => bookSearch(bookQuery)}
              LoadingComponent={() => <div>Loading results...</div>}
              RenderItems={RenderSearchPage}
            />
          );
        }}
      </SearchContext.Consumer>
    </>
  );
};

export default SearchResultsList;
