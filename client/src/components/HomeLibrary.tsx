import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import { BookCard } from "./BookCard";

interface HomeLibrariesProps {
  library: string;
}

export const HomeLibrary: React.FC<HomeLibrariesProps> = ({ library }) => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading>{library} (2)</Heading>
        <Text>View all</Text>
      </Flex>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <BookCard
          googleId="343"
          imageUrl="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          title="The Irresistable Rise of Harry Potter"
          author="Andrew Blake"
          rating={2}
        />
        <BookCard
          googleId="343"
          imageUrl="https://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          title="The Irresistable Rise of Harry Potter"
          author="Andrew Blake"
          rating={3}
        />
        <BookCard
          googleId="343"
          imageUrl="https://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          title="The Irresistable Rise of Harry Potter"
          author="Andrew Blake"
          rating={4}
        />
        <BookCard
          googleId="343"
          imageUrl="https://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          title="The Irresistable Rise of Harry Potter"
          author="Andrew Blake"
          rating={5}
        />
      </Flex>
    </Box>
  );
};
