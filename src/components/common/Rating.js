import React from "react";
import { Box } from "@chakra-ui/core";
import { FaStar } from "react-icons/fa";

export default function Rating() {
  return (
    <Box>
      <Box as={FaStar} size="1.25rem" color="#E8E8E8" pr=".125rem" />
      <Box as={FaStar} size="1.25rem" color="#E8E8E8" pr=".125rem" />
      <Box as={FaStar} size="1.25rem" color="#E8E8E8" pr=".125rem" />
      <Box as={FaStar} size="1.25rem" color="#E8E8E8" pr=".125rem" />
      <Box as={FaStar} size="1.25rem" color="#E8E8E8" pr=".125rem" />
    </Box>
  );
}
