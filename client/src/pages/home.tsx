import React from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import HomePage from "../components/ProtectedPages/Home";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  // const { data } = useMyBooksQuery();
  // const toRead = data?.myBooks.filter((x) => x.readingStatus === "To Be Read");
  // const reading = data?.myBooks.filter((x) => x.readingStatus === "Reading");
  return (
    <ProtectedRoute component={HomePage} />
    //   {/* <NavBar />
    //   <SearchBooks />
    //   <PageLayout>
    //     <HomeLibrary library="Reading" books={reading} />
    //     <HomeLibrary library="To Read" books={toRead} />
    //   </PageLayout>
    // </> */}
  );
};
export default Home;
