import React, { createContext, useState } from "react";

const SearchContext = createContext("");

const SearchProvider = ({ children }) => {
  const [bookQuery, setBookQuery] = useState("");

  return (
    <SearchContext.Provider value={{ bookQuery, setBookQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
