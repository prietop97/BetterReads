import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
// import { Button } from "./index";

import {
  Flex,
  Text,
  Input,
  Button,
  Box,
  Icon,
  IconButton,
  Stack,
  InputGroup,
  InputRightElement
} from "@chakra-ui/core";

import { AiOutlineSearch } from "react-icons/ai";
import SearchContext from "../../state/context/SearchContext";

const SearchBar = props => {
  const history = useHistory();

  const testSearch = "The Giver";
  const [bookQuery, setBookQuery] = useState("");

  function submitSearchQuery() {
    history.push({ pathname: "/search", query: bookQuery });
  }

  return (
    <>
      <Flex background="#f3f6f5" p="1rem 4rem" m="0" direction="column">
        <Text
          m="1rem"
          color="#3b403d"
          fontSize="2.25rem"
          fontFamily="Frank Ruhl Libre"
          fontWeight="bold"
          lineHeight="2.5rem"
        >
          What are you reading?
        </Text>
        <Text
          margin="0 1rem"
          color="#4e4c4a"
          lineHeight="1.375rem"
          fontFamily="Open Sans"
        >
          Search for a book that you want to track and add to shelves.
        </Text>
        <Flex m="1rem" align="center">
          {/* <SearchContext.Provider value={{ setBookQuery, submitSearchQuery }}> */}
          <SearchContext.Consumer>
            {value => {
              return (
                <form
                  onSubmit={() => {
                    value.submitSearchQuery();
                  }}
                >
                  <Stack isInline spacing={0}>
                    <Input
                      size="md"
                      width="17rem"
                      fontSize="1rem"
                      placeholder="Search for a book"
                      borderColor="rgb(217,217,217)"
                      borderRadius="0.25rem 0 0 0.25rem"
                      onChange={e => {
                        console.log(e.target.value);
                        value.setBookQuery(e.target.value);
                      }}
                    />

                    <IconButton
                      type="submit"
                      icon="search"
                      bg="#547862"
                      color="white"
                      size="1.75rem"
                      fontSize="1.5rem"
                      p="0.5rem .75rem"
                      borderRadius="0 0.25rem 0.25rem 0"
                      border="none"
                    />
                  </Stack>
                </form>
              );
            }}
          </SearchContext.Consumer>
          {/* </SearchContext.Provider> */}
        </Flex>
      </Flex>
    </>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired
};
