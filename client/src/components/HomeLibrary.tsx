import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import { BookCard } from "./BookCard";
import {
  BookshelvesUserBook,
  useMyBookshelfQuery,
  UserBook,
  useMyBooksQuery,
} from "../generated/graphql";

interface HomeLibrariesProps {
  library: string;
  books: any | undefined;
}

export const HomeLibrary: React.FC<HomeLibrariesProps> = ({
  library,
  books,
}) => {
  return (
    <Box mt={2} borderBottom="1px solid rgb(217,217,217)">
      <Flex justifyContent="space-between">
        <Text
          m="0 0"
          color="#4e4c4a"
          fontSize="1.25rem"
          fontWeight="bold"
          lineHeight="1.875rem"
          pb="1rem"
        >
          {library} ({books?.length || 0})
        </Text>
        <Text>View all</Text>
      </Flex>
      <Flex justifyContent="space-between" flexWrap="wrap">
        {books &&
          books?.map((x: UserBook) => {
            return (
              <BookCard
                googleId={x.book.googleId!}
                imageUrl={x.book.thumbnail!}
                title={x.book.title!}
                author={x.book.author!}
                rating={x.rating!}
                favorited={x.favorited}
                status={x.readingStatus}
              />
            );
          })}
      </Flex>
    </Box>
  );
};
