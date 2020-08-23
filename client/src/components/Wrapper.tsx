import React from "react";
import { Box } from "@chakra-ui/core";

interface WrapperProps {
  variant?: "small" | "regular";
  centered?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  centered = true,
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "1700px" : "400px"}
      w="100%"
      mt={4}
      mx={centered ? "auto" : 0}
    >
      {children}
    </Box>
  );
};
