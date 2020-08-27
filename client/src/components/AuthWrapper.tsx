import React from "react";
import { Flex, Heading, Box, Text } from "@chakra-ui/core";
import { Wrapper } from "./Wrapper";
import { useRouter } from "next/router";

interface AuthWrapperProps {
  heading: string;
  redirectText: string;
  redirectText2: string;
  redirectLink: string;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  heading,
  redirectText,
  redirectText2,
  redirectLink,
}) => {
  const router = useRouter();
  return (
    <Flex>
      <Flex
        direction="column"
        justify="center"
        align="center"
        w={["100%", "100%", "50%"]}
      >
        <Wrapper variant="small">
          <Heading color="teal.400" fontFamily="heading">
            {heading}
          </Heading>
          <Flex mt="0.5rem">
            <Text mr="0.5rem">{redirectText}</Text>
            <Text
              as="a"
              color="teal.400"
              onClick={() => router.push(redirectLink)}
              cursor="pointer"
            >
              {redirectText2}
            </Text>
          </Flex>
          {children}
        </Wrapper>
      </Flex>
      <Box
        width={["0", "0", "50%", "50%"]}
        height="100vh"
        backgroundColor="red"
        background={`url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=841&q=80") no-repeat center /cover`}
      />
    </Flex>
  );
};
