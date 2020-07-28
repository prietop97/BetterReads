import React from "react";
import BookPreviewLoading from "../../common/BookPreviewLoading";
import { Flex } from "@chakra-ui/core";

export default function BooksPreviewLoading() {
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      flexWrap="wrap"
      width="55%"
    >
      {Array(10)
        .fill()
        .map((x, i) => (
          <BookPreviewLoading />
        ))}
    </Flex>
  );
}
