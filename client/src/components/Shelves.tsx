import React from "react";
import { Heading, Box, Button, Text, Flex, Image } from "@chakra-ui/core";

interface ShelvesProps {}

export const Shelves: React.FC<ShelvesProps> = ({}) => {
  return (
    <Box w="300px">
      <Heading>My Shelves</Heading>
      <Text>Create shelves and add books to your custom shelf</Text>
      <Button variant="outline">Create new shelf</Button>
      <Box border="1px gray solid">
        <Text>Reading</Text>
        <Flex justifyContent="space-evenly">
          <Image
            maxWidth="50px"
            src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          ></Image>
          <Image
            maxWidth="50px"
            src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          ></Image>
        </Flex>
        <Text>2 Books</Text>
      </Box>
    </Box>
  );
};
