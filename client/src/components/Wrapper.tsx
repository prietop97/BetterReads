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
      maxW={variant === "regular" ? "1500px" : "400px"}
      w="95%"
      my={2}
      mx={centered ? "auto" : 0}
    >
      {children}
    </Box>
  );
};
