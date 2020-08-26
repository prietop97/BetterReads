import React, { useState } from "react";
import { Box, Button, Text, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { CreateShelfModal } from "./CreateShelfModal";
import { useMyBooksQuery } from "../generated/graphql";

interface ShelvesProps {}

export const Shelves: React.FC<ShelvesProps> = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useMyBooksQuery();
  const reading = data?.myBooks?.filter((x) => x.readingStatus === "Reading");
  const toBeRead = data?.myBooks.filter(
    (x) => x.readingStatus === "To Be Read"
  );
  const defaultValue = (
    <Box
      mx={"0.5rem"}
      onClick={() => router.push(`/shelves`)}
      cursor="pointer"
      background={`url("/lockedBook.svg") no-repeat center /cover`}
      width="50px"
      height="69px"
    />
  );
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
          My Shelves {">"}
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
          <Flex
            border="1px solid rgb(217,217,217)"
            w={"60%"}
            mt="1rem"
            p="0.5rem 1rem"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Text>Reading</Text>
            <Flex justify="center">
              {reading?.length
                ? reading
                    .filter((_, i) => i < 2)
                    .map((x) => {
                      return (
                        <Box
                          mx={"0.5rem"}
                          onClick={() => router.push(`/book/${x.book.id}`)}
                          cursor="pointer"
                          background={`url(${x.book.thumbnail}) no-repeat center /cover`}
                          // height="118px"
                          // width="86px"
                          width="50px"
                          height="69px"
                        />
                      );
                    })
                : defaultValue}
            </Flex>
            <Text>{reading?.length || 0} Books</Text>
          </Flex>
          <Flex
            border="1px solid rgb(217,217,217)"
            w={"60%"}
            mt="1rem"
            p="0.5rem 1rem"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Text color="#333">To Be Read</Text>
            <Flex justify="center">
              {toBeRead?.length
                ? toBeRead
                    .filter((_, i) => i < 2)
                    .map((x) => {
                      return (
                        <Box
                          mx={"0.5rem"}
                          onClick={() => router.push(`/book/${x.book.id}`)}
                          cursor="pointer"
                          background={`url(${x.book.thumbnail}) no-repeat center /cover`}
                          width="50px"
                          height="69px"
                        />
                      );
                    })
                : defaultValue}
            </Flex>
            <Text>{toBeRead?.length || 0} Books</Text>
          </Flex>
          <Flex
            border="1px solid rgb(217,217,217)"
            w={"60%"}
            mt="1rem"
            p="0.5rem 1rem"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Text>My Books</Text>
            <Flex justify="center">
              {data?.myBooks.length
                ? data.myBooks
                    ?.filter((_, i) => i < 2)
                    .map((x) => {
                      return (
                        <Box
                          mx={"0.5rem"}
                          onClick={() => router.push(`/book/${x.book.id}`)}
                          cursor="pointer"
                          background={`url(${x.book.thumbnail}) no-repeat center /cover`}
                          width="50px"
                          height="69px"
                        />
                      );
                    })
                : defaultValue}
            </Flex>
            <Text>{data?.myBooks.length || 0} Books</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
