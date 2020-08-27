import React from "react";
import { NextPage } from "next";
import { ProtectedRoute } from "../components/ProtectedRoute";
import SearchPage from "../components/ProtectedPages/Search";

const Search: NextPage<any> = () => {
  return <ProtectedRoute component={SearchPage} />;
};

export default Search;
