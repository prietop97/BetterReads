import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import { FaStar, FaHeart, FaUserCircle } from "react-icons/fa";
import { Router, useRouter } from "next/router";
import { AiOutlineArrowDown } from "react-icons/ai";

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
  const router = useRouter();
  return (
    <Flex
      w={["100%", "100%", "100%", "47%"]}
      marginTop="1rem"
      paddingBottom="1rem"
      justifyContent="flex-start"
    >
      <Box width="86px">
        <Box width="86px">
          <Box
            onClick={() => router.push(`/book/${props.googleId}`)}
            cursor="pointer"
            background={`url(${props.imageUrl}) no-repeat center /cover`}
            height="118px"
            width="86px"
          />
        </Box>
        <Menu>
          <MenuButton width="100%">
            <Button
              color="white"
              backgroundColor="Teal"
              isFullWidth
              borderRadius="none"
              fontSize="0.8rem"
              _hover={{ backgroundColor: "Teal", color: "white" }}
              height="30px"
              rightIcon={AiOutlineArrowDown}
            >
              {props.status || "Track This"}
            </Button>
          </MenuButton>
          <MenuList>
            <MenuItem>To Read</MenuItem>
            <MenuItem>Reading</MenuItem>
            <MenuItem>Finished</MenuItem>
            {props.favorited !== undefined && <MenuItem>Remove</MenuItem>}
          </MenuList>
        </Menu>
      </Box>
      <Box ml="1rem">
        <Heading
          onClick={() => router.push(`/book/${props.googleId}`)}
          cursor="pointer"
          fontSize="1rem"
          fontFamily="Frank Ruhl Libre"
        >
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
      </Box>
      {props.favorited !== undefined && (
        <Flex width="10%" ml="auto" justifyContent="flex-end">
          <Box
            as={FaHeart}
            size="1.5rem"
            fill={!props.favorited ? "grey" : "#EA7258"}
          />
        </Flex>
      )}
    </Flex>
  );
};
