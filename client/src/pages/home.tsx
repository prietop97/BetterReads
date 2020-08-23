import React from "react";
import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";
import { SearchBooks } from "../components/SearchBooks";
import { HomeLibrary } from "../components/HomeLibrary";
import { Wrapper } from "../components/Wrapper";
import { Shelves } from "../components/Shelves";
import { Flex, Box } from "@chakra-ui/core";
import { PageLayout } from "../components/PageLayout";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  return (
    <>
      <NavBar />
      <SearchBooks />
      <PageLayout>
        <Box>
          <HomeLibrary library="Reading" />
        </Box>
        <Box mt="2rem">
          <HomeLibrary library="To Read" />
        </Box>
      </PageLayout>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
