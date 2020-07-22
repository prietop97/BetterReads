import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { bookSearch } from "../../api";

const SearchContext = createContext("");

export const SearchProvider = ({ children }) => {
  const history = useHistory();

  const [bookQuery, setBookQuery] = useState("");
  const [bookResults, setBookResults] = useState([]);

  function submitSearchQuery(e) {
    e.preventDefault();

    console.log(bookQuery);

    // bookSearch(bookQuery).then(res => setBookResults(res));
    // the line below causes a complete re-render of the app, losing all state
    history.push({ pathname: "/search", query: bookQuery });
  }

  return (
    <SearchContext.Provider
      value={{ bookQuery, setBookQuery, submitSearchQuery, bookResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
