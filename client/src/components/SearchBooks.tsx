import React from "react";
import { Box, Heading, Text, IconButton, Flex, Button } from "@chakra-ui/core";
import { Wrapper } from "./Wrapper";
import { InputField } from "./InputField";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

interface SearchBooksProps {}

export const SearchBooks: React.FC<SearchBooksProps> = ({}) => {
  const router = useRouter();

  return (
    <Box backgroundColor="rgb(243, 246, 245)" py={2} pb={3}>
      <Wrapper>
        {router.pathname === "/home" && (
          <Box m={0}>
            <Text fontSize="2.2rem" fontWeight="bold">
              What are you reading?
            </Text>
            <Text>
              Search for a book that you want to track and add to shelves.
            </Text>
          </Box>
        )}
        <Formik
          initialValues={{ bookQuery: "" }}
          onSubmit={async (values) => {
            router.push({
              pathname: "/search",
              query: { name: values.bookQuery },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Wrapper centered={false} variant="small">
                <Flex w="100%" alignItems="center" justifyContent="flex-start">
                  <InputField
                    placeholder="Search for a book"
                    name="bookQuery"
                  />
                  <IconButton
                    isLoading={isSubmitting}
                    variantColor="teal"
                    icon="search"
                    aria-label="Search Books"
                    as={Button}
                    type="submit"
                  ></IconButton>
                </Flex>
              </Wrapper>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
};
