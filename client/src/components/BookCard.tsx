import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/core";
import { FaStar, FaHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineArrowDown } from "react-icons/ai";
import {
  useCreateBookMutation,
  useCreateUserBookMutation,
  useUpdateUserBookMutation,
  useDeleteUserBookMutation,
  MyBooksDocument,
} from "../generated/graphql";

interface BookCardProps {
  id?: number;
  googleId: string;
  imageUrl: string;
  status?: string;
  title: string;
  author: string;
  rating: number | null;
  favorited?: boolean;
  onlyImage?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  onlyImage = false,
  ...props
}) => {
  const toast = useToast();
  const [addBook] = useCreateBookMutation();
  const [addUserBook] = useCreateUserBookMutation();
  const [editUserBook] = useUpdateUserBookMutation();
  const [deleteUserBook] = useDeleteUserBookMutation();

  const BookToast = (message: string) => {
    toast({
      title: `${message}`,
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box backgroundColor="teal.400">
          <Text color="white" padding="1rem 4rem">
            {message}
          </Text>
        </Box>
      ),
    });
  };

  const updateBookReadingStatus = async (status: string) => {
    const edited = await editUserBook({
      variables: {
        id: props.id!,
        favorited: props.favorited!,
        readingStatus: status,
      },
    });
    return edited;
  };

  const updateBookFavorite = async () => {
    const edited = await editUserBook({
      variables: {
        id: props.id!,
        favorited: !props.favorited ? true : false,
        readingStatus: props.status!,
      },
    });
    return edited;
  };
  const updateBookRating = async (rating: number) => {
    const edited = await editUserBook({
      variables: {
        id: props.id!,
        favorited: props.favorited!,
        readingStatus: props.status!,
        rating,
      },
    });
    return edited;
  };

  const addOrEditBookWrapper = async (status: string) => {
    if (props.favorited !== undefined && props.favorited !== null) {
      const editedBook = await updateBookReadingStatus(status);
      return editedBook;
    }
    const book = await addBook({
      variables: {
        googleId: props.googleId,
        thumbnail: props.imageUrl,
        title: props.title,
        author: props.author,
      },
    });
    if (!book.data) {
      BookToast("Book not added, try again later!");
      return;
    }
    const userBook = await addUserBook({
      variables: {
        bookId: book.data.createBook.id,
        readingStatus: status,
      },
      refetchQueries: [{ query: MyBooksDocument }],
    });
    const bool = userBook.data && Object.keys(userBook.data).length;
    if (bool) BookToast("Book added");
    else BookToast("Book not added, try again later!");
    return userBook;
  };

  const router = useRouter();
  return (
    <Flex
      w={onlyImage ? "86px" : ["100%", "100%", "100%", "47%"]}
      marginTop="1rem"
      paddingBottom="1rem"
      justifyContent="flex-start"
      mr="1rem"
    >
      <Box width="86px">
        <Box width="86px">
          <Box
            onClick={() => router.push(`/book/${props.googleId}`)}
            cursor="pointer"
            background={`url(${props.imageUrl}) no-repeat center /cover`}
            height="118px"
            width="86px"
          />
        </Box>
        <Menu>
          <MenuButton width="100%">
            <Button
              color="white"
              backgroundColor="teal.400"
              isFullWidth
              borderRadius="none"
              fontSize="0.8rem"
              height="30px"
              rightIcon="chevron-down"
            >
              {props.status || "Track This"}
            </Button>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => addOrEditBookWrapper("To Be Read")}>
              To Be Read
            </MenuItem>
            <MenuItem onClick={() => addOrEditBookWrapper("Reading")}>
              Reading
            </MenuItem>
            <MenuItem onClick={() => addOrEditBookWrapper("Finished")}>
              Finished
            </MenuItem>
            {props.favorited !== undefined && (
              <MenuItem
                onClick={async () => {
                  await deleteUserBook({
                    variables: { id: props.id! },
                    update: (cache) => {
                      cache.evict({ id: "UserBook:" + props.id });
                    },
                  });
                }}
              >
                Remove
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
      {!onlyImage && (
        <Box ml="1rem">
          <Heading
            onClick={() => router.push(`/book/${props.googleId}`)}
            cursor="pointer"
            fontSize="1rem"
            fontFamily="Frank Ruhl Libre"
          >
            {props.title.length > 70
              ? props.title.substring(0, 70) + "..."
              : props.title}
          </Heading>
          <Text fontSize="0.875rem" fontFamily="Frank Ruhl Libre">
            {props.author}
          </Text>
          <Flex>
            {Array(5)
              .fill(0)
              .map((_, i) => {
                return (
                  <Box
                    as={FaStar}
                    size="1.25rem"
                    cursor="pointer"
                    color={
                      props.rating && props.rating >= i + 1
                        ? "#EA7258"
                        : "#E8E8E8"
                    }
                    pr=".125rem"
                    onClick={async () => {
                      if (
                        props.favorited !== null &&
                        props.favorited !== undefined
                      ) {
                        await updateBookRating(i + 1);
                      }
                    }}
                  />
                );
              })}
          </Flex>
        </Box>
      )}
      {props.favorited !== undefined && !onlyImage && (
        <Flex width="10%" ml="auto" justifyContent="flex-end">
          <Box
            as={FaHeart}
            size="1.5rem"
            fill={!props.favorited ? "grey" : "#EA7258"}
            cursor="pointer"
            onClick={() => updateBookFavorite()}
          />
        </Flex>
      )}
    </Flex>
  );
};
