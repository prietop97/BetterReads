import React, { useState } from "react";
import { Box, Button, Text, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { CreateShelfModal } from "./CreateShelfModal";

interface ShelvesProps {}

export const Shelves: React.FC<ShelvesProps> = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <CreateShelfModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <Flex
        direction="column"
        w={["100%", "100%", "100%", "20%"]}
        my={["2rem", "2rem", "2rem", "0rem"]}
      >
        <Text
          fontSize="1.5rem"
          color="Teal"
          lineHeight="1.875rem"
          fontWeight="bold"
          fontFamily="Frank Ruhl Libre"
          cursor="pointer"
          onClick={() => router.push("/shelves")}
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
          onClick={() => setIsOpen(!isOpen)}
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
    </>
  );
};
