import React, { createContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { bookSearch } from "../../api";

const SearchContext = createContext("");

export const SearchProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const [bookQuery, setBookQuery] = useState("");
  const [bookNumber, setBookNumber] = useState(0);
  const [bookResults, setBookResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [additionalLoading, setAdditionalLoading] = useState(false);

  // function pushToSearchPage() {
  //   history.push({ pathname: "/search", query: bookQuery });
  //   // the line below causes a complete re-render of the app, losing all state
  // }
  function getBookResults(e) {
    e.preventDefault();
    setIsFetching(true);
    bookSearch(bookQuery, 0).then(res => {
      setBookResults(res);
      setIsFetching(false);
      setBookNumber(res.length);
    });

    console.log(location.pathname);
    if (location.pathname !== "/search") history.push("/search");
  }
  function getMoreBooks(e) {
    e.preventDefault();
    setAdditionalLoading(true);
    bookSearch(bookQuery, bookNumber).then(res => {
      setBookResults([...bookResults, ...res]);
      setAdditionalLoading(false);
      setBookNumber(bookNumber + res.length);
    });
  }

  return (
    <SearchContext.Provider
      value={{
        bookQuery,
        setBookQuery,
        bookResults,
        isFetching,
        getBookResults,
        getMoreBooks,
        additionalLoading
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
