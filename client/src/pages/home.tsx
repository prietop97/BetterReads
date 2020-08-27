import React from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import HomePage from "../components/ProtectedPages/Home";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  return <ProtectedRoute component={HomePage} />;
};
export default Home;
