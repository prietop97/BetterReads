import React from "react";

import { Flex, Text, Box } from "@chakra-ui/core";
import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <Flex justify="space-between" align="center" m="0rem 5rem">
      <Text
        as={Link}
        to={"/dashboard"}
        fontSize="1.5rem"
        color="#5c7c69"
        textDecoration="none"
      >
        Readrr
      </Text>
      <Box as={FaUserCircle} size="2rem" color="#7E8D88" />
    </Flex>
  );
};

export default Header;
