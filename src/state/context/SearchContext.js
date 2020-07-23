import React, { createContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { bookSearch } from "../../api";

const SearchContext = createContext("");

export const SearchProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const [bookQuery, setBookQuery] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  function pushToSearchPage() {
    history.push({ pathname: "/search", query: bookQuery });
    // the line below causes a complete re-render of the app, losing all state
  }
  function getBookResults(e) {
    e.preventDefault();
    setIsFetching(true);
    bookSearch(bookQuery).then(res => {
      setBookResults(res);
      setIsFetching(false);
    });
    console.log(location.pathname);
    if (location.pathname !== "/search") pushToSearchPage();
  }

  return (
    <SearchContext.Provider
      value={{
        bookQuery,
        setBookQuery,
        bookResults,
        isFetching,
        setIsFetching,
        getBookResults
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
