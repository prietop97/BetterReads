import React from "react";

import { bookSearch } from "../../../api";

import SearchContext, {
  SearchProvider
} from "../../../state/context/SearchContext";

import { List, SearchBar, Header } from "../../common";
import RenderSearchPage from "./RenderSearchPage";

const SearchResultsList = () => {
  return (
    <>
      <Header />
      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />
      <SearchContext.Consumer>
        {value => {
          if (value.bookQuery) {
            return (
              <List
                getItemsData={() => bookSearch(value.bookQuery)}
                LoadingComponent={() => <div>Loading results...</div>}
                RenderItems={RenderSearchPage}
              />
            );
          } else {
            return <div>Nothing to search for. Try again.</div>;
          }
        }}
      </SearchContext.Consumer>
    </>
  );
};

export default SearchResultsList;
