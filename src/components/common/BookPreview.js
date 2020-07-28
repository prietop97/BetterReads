import React from "react";
import { Flex, Box, Image, Text, Skeleton } from "@chakra-ui/core";
import { FaRegHeart, FaSortDown } from "react-icons/fa";
import Select from "../common/Select";
import Rating from "./Rating";

export default function BookPreview({ book }) {
  console.log(book);
  return (
    <Flex
      key={book.id}
      w={["100%", "100%", "100%", "47%"]}
      marginTop="1rem"
      paddingBottom="1rem"
      borderBottom="1px solid rgb(217,217,217)"
    >
      <Box roundedTopLeft="lg" width="80px">
        <Image
          src={book.volumeInfo?.imageLinks?.smallThumbnail}
          alt={book.volumeInfo?.title}
          width="auto"
          objectFit="cover"
          height="120px"
          width="80px"
          pb="0"
          mb="0"
        />
        <Select
          size="sm"
          width="100%"
          icon={"none"}
          rounded="0"
          variant="filled"
          placeholder="Track This"
          fontSize="0.1rem"
          roundedBottomLeft="lg"
          fontSize=".875rem"
          iconSize=".875rem"
          pt="0"
          mt="0"
          items={[
            { id: 1, option: "To Read" },
            { id: 2, option: "Reading" },
            { id: 3, option: "Finished" }
          ]}
        ></Select>
      </Box>
      <Box pl="1rem" width="100%">
        <Flex alignItems="start" justifyContent="space-between">
          <Box>
            <Text fontSize="1rem" fontFamily="Frank Ruhl Libre">
              {book.volumeInfo.title}
            </Text>
            <Text fontSize="0.875rem" fontFamily="Frank Ruhl Libre">
              {book.volumeInfo &&
                book.volumeInfo.authors &&
                book.volumeInfo.authors[0]}
            </Text>
          </Box>
          <Box
            as={FaRegHeart}
            size="1.5rem"
            color="rgb(210, 71, 25)"
            width="10%"
            flexShrink={0}
          />
        </Flex>
        <Box>
          <Rating />
          <Flex direction="row">
            {/* <Box><Input placeholder="Date Started" size="sm" w="75%" borderColor="rgb(232,232,232)" /></Box>
          <Box><Input placeholder="Date Finished" size="sm" w="75%" borderColor="rgb(232,232,232)" /></Box> */}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
