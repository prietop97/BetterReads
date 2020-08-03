import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Flex, Button, Box, Text } from "@chakra-ui/core";

import SearchContext from "../../../state/context/SearchContext";
import BookPreview from "../../common/BookPreview";

const RenderSearchPage = props => {
  const searchContext = useContext(SearchContext);
  const { getMoreBooks } = searchContext;
  const {
    additionalLoading,
    isFetching,
    fetchMore
  } = searchContext.searchState;
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      flexWrap="wrap"
      width={["100%", "100%", "100%", "65%"]}
    >
      {props.data.map(book => (
        <BookPreview key={book.id} book={book} isFetching={isFetching} />
      ))}
      {props.data.length && fetchMore ? (
        <Button
          isLoading={additionalLoading}
          fontWeight="500"
          bg="transparent"
          width="100%"
          margin="1rem 0"
          fontSize="1rem"
          color="#547862"
          border="1px solid rgb(217,217,217)"
          lineHeight="1.375rem"
          cursor="pointer"
          _hover="none"
          onClick={getMoreBooks}
        >
          Load More
        </Button>
      ) : null}
    </Flex>
  );
};

export default RenderSearchPage;

RenderSearchPage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.string,
      id: PropTypes.string,
      etag: PropTypes.string,
      selfLink: PropTypes.string,
      volumeInfo: PropTypes.object,
      saleInfo: PropTypes.object,
      accessInfo: PropTypes.object,
      searchInfo: PropTypes.object
    })
  ).isRequired
};
