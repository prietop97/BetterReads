import React from "react";

import { Flex, Text, Input, Button, Box } from "@chakra-ui/core";

import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

function DashboardContainer() {
  return (
    <>
      <Flex justify="space-between" align="center" m="0rem 5rem">
        <Text fontSize="1.5rem" color="#5c7c69">
          Readrr
        </Text>
        <Box as={FaUserCircle} size="2rem" color="#7E8D88" />
      </Flex>
      <Flex background="#f3f6f5" p="1rem 4rem" m="0" direction="column">
        <Text
          m="1rem"
          color="#3b403d"
          fontSize="2.6rem"
          fontFamily="Frank Ruhl Libre"
          fontWeight="bold"
          lineHeight="2.5rem"
        >
          What are you reading?
        </Text>
        <Text
          margin="0 1rem"
          color="#4e4c4a"
          lineHeight="1.375rem"
          fontFamily="Open Sans"
        >
          Search for a book that you want to track and add to shelves.
        </Text>
        <Flex m="1rem" align="center">
          <Input
            width="17rem"
            height="2.5rem"
            fontSize=" 1rem"
            placeholder="Search for a book"
            borderRadius="0.25rem 0 0 0.25rem"
          />
          <Box
            as={AiOutlineSearch}
            bg="#547862"
            color="white"
            size="1.7rem"
            p="0.5rem"
            borderRadius="0 0.25rem 0.25rem 0"
          />
        </Flex>
      </Flex>
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
        <Flex m="1rem 4rem" direction="column" w="13rem">
          <Text
            fontSize="1.5rem"
            color="#547862"
            lineHeight="1.875rem"
            fontWeight="bold"
            fontFamily="Frank Ruhl Libre"
          >
            My Shelves
          </Text>
          <Text m="0.5rem 0" color="#4e4c4a" lineHeight="1.375rem">
            Create shelves and add books to your custom shelf.
          </Text>
          <Button
            fontWeight="500"
            bg="none"
            width="10rem"
            fontSize="1rem"
            color="#d24719"
            border="1px solid #d24719"
            lineHeight="1.375rem"
            cursor="pointer"
            _hover="none"
          >
            Create new shelf
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default DashboardContainer;
