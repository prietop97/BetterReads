import React from "react";
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import NextLink from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { Wrapper } from "./Wrapper";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  let body = null;
  if (data && data.me) {
    body = (
      <>
        <NextLink href="/home">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
          >
            Home
          </Text>
        </NextLink>
        <Menu>
          <MenuButton>
            <Box ml={6} as={FaUserCircle} size="2rem" color="#7E8D88" />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
                router.push("/");
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else if (!loading) {
    body = (
      <>
        <NextLink href="/register">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
          >
            Register
          </Text>
        </NextLink>
        <NextLink href="/login">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
            ml={6}
          >
            Login
          </Text>
        </NextLink>
      </>
    );
  }
  return (
    <Box>
      <Wrapper>
        <Flex justify="space-between" align="center">
          <NextLink href="/">
            <Text
              fontSize="1.6rem"
              fontWeight={700}
              color="#5c7c69"
              textDecoration="none"
              cursor="pointer"
            >
              Readrr
            </Text>
          </NextLink>
          <Flex justifyContent="flex-end">{body}</Flex>
        </Flex>
      </Wrapper>
    </Box>
  );
};
