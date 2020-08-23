import React from "react";
import { Box, Heading, Text, IconButton, Flex, Button } from "@chakra-ui/core";
import { Wrapper } from "./Wrapper";
import { InputField } from "./InputField";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

interface SearchBooksProps {}

export const SearchBooks: React.FC<SearchBooksProps> = ({}) => {
  const router = useRouter();
  console.log(router);

  return (
    <Box backgroundColor="rgb(243, 246, 245)">
      <Wrapper>
        {router.pathname === "/home" && (
          <Box>
            <Heading>What are you reading?</Heading>
            <Text>
              Search for a book that you want to track and add to shelves.
            </Text>
          </Box>
        )}
        <Formik
          initialValues={{ bookQuery: "" }}
          onSubmit={async (values) => {
            console.log(values);
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
                    variantColor="blue"
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
