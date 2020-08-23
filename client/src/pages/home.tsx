import React from "react";
import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";
import { SearchBooks } from "../components/SearchBooks";
import { HomeLibrary } from "../components/HomeLibrary";
import { Wrapper } from "../components/Wrapper";
import { Shelves } from "../components/Shelves";
import { Flex } from "@chakra-ui/core";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  return (
    <>
      <NavBar />
      <SearchBooks />
      <Wrapper>
        <Flex>
          <HomeLibrary library="Reading" />
          <Shelves />
        </Flex>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
