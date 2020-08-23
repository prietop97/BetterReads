import React from "react";
import { Wrapper } from "./Wrapper";
import { Shelves } from "./Shelves";
import { Flex, Box } from "@chakra-ui/core";

interface PageLayoutProps {
  showShelfSmall?: boolean;
  children: any;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showShelfSmall = false,
}) => {
  return (
    <Wrapper>
      <Flex justifyContent="space-between" flexWrap="wrap" my="2rem">
        <Box w={["100", "100%", "100%", "60%"]}>{children}</Box>
        <Shelves showShelfSmall={showShelfSmall} />
      </Flex>
    </Wrapper>
  );
};
