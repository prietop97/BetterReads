import React, { useContext } from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Text,
  Box,
  Image,
  Select,
  Button,
  Skeleton
} from "@chakra-ui/core";
import Rating from "../../common/Rating";

import { FaRegHeart, FaSortDown } from "react-icons/fa";
import SearchContext from "../../../state/context/SearchContext";

const RenderSearchPage = props => {
  const searchContext = useContext(SearchContext);
  const { getMoreBooks } = searchContext;
  const { additionalLoading, isFetching } = searchContext.searchState;
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      flexWrap="wrap"
      width="55%"
    >
      {props.data.map(book => (
        <Skeleton isLoaded={!isFetching}>
          <Flex
            key={book.id}
            w="430px"
            margin="1rem 0"
            padding="1rem 0"
            borderBottom="1px solid rgb(217,217,217)"
          >
            <Box roundedTopLeft="lg">
              {book.volumeInfo && book.volumeInfo.imageLinks ? (
                <Image
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                  alt={book.volumeInfo.title}
                  width="auto"
                  objectFit="cover"
                  height="150px"
                  width="100px"
                  pb="0"
                  mb="0"
                />
              ) : null}
              <Select
                size="sm"
                icon={FaSortDown}
                rounded="0"
                roundedBottomLeft="lg"
                fontSize=".875rem"
                pt="0"
                mt="0"
              >
                <option value="1">To Read</option>
                <option value="2">Reading</option>
                <option value="3">Finished</option>
              </Select>
            </Box>
            <Box pl="1rem" width="100%">
              <Flex alignItems="start" justifyContent="space-between">
                <Box>
                  <Text fontSize="1rem" fontFamily="Frank Ruhl Libre">
                    {book.volumeInfo.title}
                  </Text>
                  <Text fontSize="0.875rem" fontFamily="Frank Ruhl Libre">
                    {book.volumeInfo.authors}
                  </Text>
                </Box>
                <Box as={FaRegHeart} size="1.5rem" color="rgb(210, 71, 25)" />
              </Flex>
              <Box>
                <Rating />
                <Flex direction="row">
                  {/* <Box><Input placeholder="Date Started" size="sm" w="75%" borderColor="rgb(232,232,232)" /></Box>
              <Box><Input placeholder="Date Finished" size="sm" w="75%" borderColor="rgb(232,232,232)" /></Box> */}
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Skeleton>
      ))}
      <Button
        isLoading={additionalLoading}
        fontWeight="500"
        bg="transparent"
        width="100%"
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
