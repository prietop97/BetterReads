import React from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Text,
  Box,
  Image,
  Select,
  Input,
  Divider
} from "@chakra-ui/core";

import { FaRegHeart, FaRegStar, FaSortDown, FaStar } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";

const RenderSearchPage = props => (
  <div>
    {props.data.map(book => (
      <>
        <Flex key={book.id} align="center" width="25rem">
          <Flex overflow="hidden" direction="column" roundedTopLeft="0.1875rem">
            <Image
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt={book.volumeInfo.title}
              pb="0"
              m="0"
              width="5rem"
            />
            <Select
              size="sm"
              width="5rem"
              rounded="0"
              roundedBottomLeft="0.1875rem"
              fontSize=".8125rem"
              p=".3rem"
              m="0"
              placeholder="Track"
              backgroundColor="#D24719"
              color="white"
            >
              <option value="1">To Read</option>
              <option value="2">Reading</option>
              <option value="3">Finished</option>
            </Select>
          </Flex>
          <Box ml=".5rem">
            <Flex justify="space-between" width="16rem" m="0">
              <Box>
                <Text
                  fontSize="1.15rem"
                  fontFamily="Frank Ruhl Libre"
                  fontWeight="600"
                  m="0"
                  color="#4E4C4A"
                >
                  {book.volumeInfo.title}
                </Text>
                <Text fontSize="1rem" fontFamily="Frank Ruhl Libre" mt="0.5rem">
                  {book.volumeInfo.authors[0]}
                </Text>
              </Box>
              <Box>
                <Box as={BsHeart} size="2rem" color="#D24719" ml="1rem" />
              </Box>
            </Flex>
            <Box>
              <Box>
                <Box as={FaStar} size="1.5rem" color="#E8E8E8" pr=".125rem" />
                <Box as={FaStar} size="1.5rem" color="#E8E8E8" pr=".125rem" />
                <Box as={FaStar} size="1.5rem" color="#E8E8E8" pr=".125rem" />
                <Box as={FaStar} size="1.5rem" color="#E8E8E8" pr=".125rem" />
                <Box as={FaStar} size="1.5rem" color="#E8E8E8" pr=".125rem" />
              </Box>
              {/* <Flex direction="row">
						<Box><Input placeholder="Date Started" size="sm" w="75%" borderColor="rgb(232,232,232)" /></Box>
						<Box><Input placeholder="Date Finished" size="sm" w="75%" borderColor="rgb(232,232,232)" /></Box>
					</Flex> */}
            </Box>
          </Box>
        </Flex>
        <Divider />
      </>
    ))}
  </div>
);

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
