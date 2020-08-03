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
    additionalLoading: false,
    totalBooks: 0,
    fetchMore: true
  });

  function getBookResults() {
    setSearchState({
      ...searchState,
      isFetching: true,
      bookNumber: 0,
      totalBooks: 0
    });
    bookSearch(searchState.bookQuery, 0).then(res => {
      console.log(res);
      if (res.items) {
        setSearchState({
          ...searchState,
          bookResults: res.items,
          isFetching: false,
          bookNumber: res.items.length + 1,
          totalBooks: res.totalItems,
          fetchMore: res.items.length < res.totalItems
        });
      } else {
        setSearchState({
          ...searchState,
          bookResults: [],
          isFetching: false,
          fetchMore: false
        });
      }
      if (location.pathname !== "/search") history.push("/search");
    });
  }
  function getMoreBooks(e) {
    setSearchState({ ...searchState, additionalLoading: true });
    bookSearch(searchState.bookQuery, searchState.bookNumber).then(res => {
      setSearchState({
        ...searchState,
        bookResults: [...searchState.bookResults, ...res.items],
        additionalLoading: false,
        bookNumber: res.items.length + searchState.bookNumber,
        fetchMore:
          res.items.length + searchState.bookResults.length <= res.totalItems
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
