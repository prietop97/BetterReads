import React, { useContext } from "react";

import SearchContext from "../../../state/context/SearchContext";

import { List, SearchBar, Header, Button } from "../../common";
import RenderSearchPage from "./RenderSearchPage";

const SearchResultsList = () => {
  const searchContext = useContext(SearchContext);
  const { bookResults, isFetching, getMoreBooks } = searchContext;
  return (
    <>
      <Header />
      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />
      {bookResults ? (
        <>
          <List
            LoadingComponent={() => <div>Loading results...</div>}
            RenderItems={RenderSearchPage}
            items={bookResults}
            isFetching={isFetching}
          />
          <Button buttonText="Load More" handleClick={getMoreBooks} />
        </>
      ) : (
        <div>Nothing to search for. Try again.</div>
      )}
    </>
  );
};

export default SearchResultsList;
