import React from "react";
import {
  Box,
  Select,
  Flex,
  Heading,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/core";
import Head from "next/head";

interface BookCardProps {
  googleId: string;
  imageUrl: string;
  status?: string;
  title: string;
  author: string;
  rating: number;
}

export const BookCard: React.FC<BookCardProps> = (props) => {
  return (
    <Flex w={"45%"}>
      <Box width="86px">
        <Box
          background={`url(${props.imageUrl}) no-repeat center /cover`}
          height="118px"
          width="86px"
        />
        <Select placeholder="Track This">
          <option>To Read</option>
          <option>Reading</option>
          <option>To Read</option>
        </Select>
      </Box>
      <Box>
        <Heading>{props.title}</Heading>
        <Text>{props.author}</Text>
        <Flex>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <IconButton
                icon="star"
                aria-label="rate"
                color={props.rating >= i ? "red" : "grey"}
              />
            ))}
        </Flex>
      </Box>
    </Flex>
  );
};
