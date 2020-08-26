import React from "react";
import { Wrapper } from "./Wrapper";
import { Shelves } from "./Shelves";
import { Flex, Box } from "@chakra-ui/core";

interface PageLayoutProps {
  children: any;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <Flex justifyContent="space-between" flexWrap="wrap" my="2rem">
        <Box w={["100", "100%", "100%", "60%"]}>{children}</Box>
        <Shelves />
      </Flex>
    </Wrapper>
  );
};
