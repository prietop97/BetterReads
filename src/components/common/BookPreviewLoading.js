import React from "react";
import { Flex, Box, Skeleton } from "@chakra-ui/core";

export default function BookPreviewLoading() {
  return (
    <Flex
      w={["100%", "100%", "100%", "47%"]}
      margin="1rem 0"
      padding="1rem 0"
      borderBottom="1px solid rgb(217,217,217)"
    >
      <Box roundedTopLeft="lg">
        <Skeleton height="150px" marginBottom="5px" width="100px" />
      </Box>
      <Box pl="1rem" width="100%">
        <Skeleton width="100%" height="17px" marginBottom="15px" />
        <Skeleton width="100%" height="17px" marginBottom="15px" />
        <Skeleton width="50%" height="17px" marginBottom="15px" />
      </Box>
    </Flex>
  );
}
