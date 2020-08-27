import React from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import ShelfPage from "../components/ProtectedPages/Shelves";

interface shelvesProps {}

const Shelves: React.FC<shelvesProps> = ({}) => {
  return <ProtectedRoute component={ShelfPage} />;
};

export default Shelves;
