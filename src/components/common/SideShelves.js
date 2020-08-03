import React from "react";
import { Flex, Text, Button } from "@chakra-ui/core";

export default function SideShelves() {
  return (
    <Flex direction="column" w="20%">
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
  );
}
