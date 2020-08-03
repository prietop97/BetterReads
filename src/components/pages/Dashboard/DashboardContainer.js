import React from "react";

import { Flex, Text, Button } from "@chakra-ui/core";

import { SearchBar, Header } from "../../common";
import SideShelves from "../../common/SideShelves";

function DashboardContainer() {
  return (
    <>
      <Header />

      <SearchBar labelId="21" name="theSearch" placeholder="Find your book" />

      <Flex justify="space-between" m="1rem 4rem">
        <Flex width="60%" direction="column">
          <Text
            m=".5rem 1rem"
            color="#4e4c4a"
            fontSize="1.25rem"
            fontWeight="bold"
            lineHeight="1.875rem"
            pb="1rem"
            borderBottom="1.5px solid#d9d9d980"
          >
            In progress
          </Text>
          <Text
            m=".5rem 1rem"
            color="#4e4c4a"
            fontSize="1.25rem"
            fontWeight="bold"
            lineHeight="1.875rem"
            pb="1rem"
            borderBottom="1.5px solid#d9d9d980"
          >
            To be read
          </Text>
          <Text
            m=".5rem 1rem"
            color="#4e4c4a"
            fontSize="1.25rem"
            fontWeight="bold"
            lineHeight="1.875rem"
          >
            Finished
          </Text>
        </Flex>
        <SideShelves />
      </Flex>
    </>
  );
}

export default DashboardContainer;
