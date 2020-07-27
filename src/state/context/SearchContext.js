import React, { createContext, useState, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { bookSearch } from "../../api";

const SearchContext = createContext("");

export const SearchProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const [searchState, setSearchState] = useState({
    bookQuery: "",
    bookNumber: 0,
    bookResults: [],
    isFetching: false,
    additionalLoading: false
  });

  function getBookResults(e) {
    e.preventDefault();
    setSearchState({ ...searchState, isFetching: true });
    bookSearch(searchState.bookQuery, 0).then(res => {
      setSearchState({
        ...searchState,
        bookResults: res,
        isFetching: false,
        bookNumber: res.length + 1
      });
      if (location.pathname !== "/search") history.push("/search");
    });
  }
  function getMoreBooks(e) {
    setSearchState({ ...searchState, additionalLoading: true });
    bookSearch(searchState.bookQuery, searchState.bookNumber).then(res => {
      setSearchState({
        ...searchState,
        bookResults: [...searchState.bookResults, ...res],
        additionalLoading: false,
        bookNumber: res.length + searchState.bookNumber
      });
    });
  }

  return (
    <SearchContext.Provider
      value={{
        searchState,
        setSearchState,
        getBookResults,
        getMoreBooks
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
