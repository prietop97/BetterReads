import React from "react";

import { NavLink } from "react-router-dom";

import { Flex, Text } from "@chakra-ui/core";

function NavBar() {
  return (
    <>
      <Flex justify="space-between" align="center" m="0rem 3rem">
        <Text fontSize="2rem" color="#ea7751">
          Readrr
        </Text>
        <Flex>
          <NavLink to="/" activeClassName="active">
            <Text
              m="1rem"
              textDecoration="none"
              color="black"
              fontSize="1.3rem"
            >
              Home
            </Text>
          </NavLink>
          <NavLink to="/" activeClassName="active">
            <Text
              m="1rem"
              textDecoration="none"
              color="black"
              fontSize="1.3rem"
            >
              About
            </Text>
          </NavLink>
          <NavLink to="/" className="nav-link" activeClassName="active">
            <Text
              m="1rem"
              textDecoration="none"
              color="black"
              fontSize="1.3rem"
            >
              Features
            </Text>
          </NavLink>
        </Flex>
      </Flex>
    </>
  );
}

export default NavBar;
