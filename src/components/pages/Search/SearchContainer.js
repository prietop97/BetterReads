import React from "react";

import SearchContext from "../../../state/context/SearchContext";

import { List, SearchBar, Header } from "../../common";
import RenderSearchPage from "./RenderSearchPage";

const SearchResultsList = () => {
  return (
    <>
      <Header />
      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />
      <SearchContext.Consumer>
        {value => {
          console.log(value.bookResults);
          if (value.bookResults) {
            return (
              <List
                LoadingComponent={() => <div>Loading results...</div>}
                RenderItems={RenderSearchPage}
                items={value.bookResults}
                isFetching={value.isFetching}
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
