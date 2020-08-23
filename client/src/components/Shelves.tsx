import React from "react";
import { Heading, Box, Button, Text, Flex, Image } from "@chakra-ui/core";

interface ShelvesProps {
  showShelfSmall?: boolean;
}

export const Shelves: React.FC<ShelvesProps> = ({ showShelfSmall = true }) => {
  const show = () => {
    return showShelfSmall ? "20%" : "0";
  };
  return (
    <Flex
      direction="column"
      w={["100%", "100%", "100%", show()]}
      my={["2rem", "2rem", "2rem", "0rem"]}
      // display={showShelfSmall ? "flex" : "none"}
    >
      <Text
        fontSize="1.5rem"
        color="Teal"
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
        fontWeight={500}
        bg="none"
        width="10rem"
        fontSize="1rem"
        color="#d24719"
        border="1px solid #d24719"
        lineHeight="1.375rem"
        cursor="pointer"
      >
        Create new shelf
      </Button>
      <Flex flexDirection={["row", "row", "row", "column"]} mt="1rem">
        <Box border="1px black solid" w={"60%"}>
          <Text>Reading</Text>
          <Text>2 Books</Text>
        </Box>
        <Box border="1px black solid" w={"60%"} mt="1rem">
          <Text>To be Read</Text>
          <Text>2 Books</Text>
        </Box>
        <Box border="1px black solid" w={"60%"} mt="1rem">
          <Text>My Books</Text>
          <Text>7 Books</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
