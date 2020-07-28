import React from "react";
import { Box } from "@chakra-ui/core";

export default function Container({ children, ...rest }) {
  return (
    <Box {...rest} m="0 3%">
      {children}
    </Box>
  );
}
