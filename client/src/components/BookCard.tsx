import React from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/core";
import { FaStar, FaHeart } from "react-icons/fa";

interface BookCardProps {
  googleId: string;
  imageUrl: string;
  status?: string;
  title: string;
  author: string;
  rating: number | null;
  favorited?: boolean;
}

export const BookCard: React.FC<BookCardProps> = (props) => {
  return (
    <Flex
      w={["100%", "100%", "100%", "47%"]}
      marginTop="1rem"
      paddingBottom="1rem"
      justifyContent="flex-start"
    >
      <Box width="86px">
        <Box
          background={`url(${props.imageUrl}) no-repeat center /cover`}
          height="118px"
          width="86px"
        />
      </Box>
      <Box ml="1rem">
        <Heading fontSize="1rem" fontFamily="Frank Ruhl Libre">
          {props.title.length > 70
            ? props.title.substring(0, 70) + "..."
            : props.title}
        </Heading>
        <Text fontSize="0.875rem" fontFamily="Frank Ruhl Libre">
          {props.author}
        </Text>
        <Flex>
          {Array(5)
            .fill(0)
            .map((_, i) => {
              return (
                <Box
                  as={FaStar}
                  size="1.25rem"
                  color={
                    props.rating && props.rating >= i ? "#EA7258" : "#E8E8E8"
                  }
                  pr=".125rem"
                />
              );
            })}
        </Flex>
        <Button
          bg="transparent"
          mt="0.5rem"
          fontSize="1rem"
          color="#547862"
          border="1px solid rgb(217,217,217)"
          lineHeight="1.375rem"
          cursor="pointer"
        >
          Save book
        </Button>
      </Box>
      {props.favorited !== undefined && (
        <Flex width="10%" ml="auto" justifyContent="flex-end">
          <Box
            as={FaHeart}
            size="1.5rem"
            // color={!props.favorited ? "rgb(210, 71, 25)" : "Red"}
            fill={!props.favorited ? "grey" : "#EA7258"}
          />
        </Flex>
      )}
    </Flex>
  );
};
