import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { PageLayout } from "../../components/PageLayout";
import { withApollo } from "../../utils/withApollo";
import { BookCard } from "../../components/BookCard";
import { useRouter } from "next/router";
import { SearchBooks } from "../../components/SearchBooks";
import {
  Box,
  Text,
  Heading,
  Flex,
  Stack,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  IconButton,
  BreadcrumbLink,
} from "@chakra-ui/core";
import { Wrapper } from "../../components/Wrapper";
import { AiOutlineHome } from "react-icons/ai";

interface BookPageProps {}

const BookPage: React.FC<BookPageProps> = ({}) => {
  const [book, setBook] = useState<any>({});
  const categoriesAlgo = (x: string[]) => {
    let myarray: string[] = [];
    x.forEach((y: string) => {
      myarray = [...myarray, ...y.split("/")];
    });
    return myarray.filter((z: string, b: number) => myarray.indexOf(z) === b);
  };
  const router = useRouter();
  const initialSearch = async () => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${router.query.pid}`
    );
    const jsonRes = await res.json();
    if (!jsonRes.volumeInfo) {
      router.push("/home");
    } else {
      console.log(jsonRes);
      setBook(jsonRes);
    }
  };
  useEffect(() => {
    initialSearch();
  }, [router.query.pid]);
  return (
    <>
      <NavBar />
      <SearchBooks />
      <Wrapper>
        <Breadcrumb>
          <BreadcrumbItem>
            <IconButton
              onClick={() => router.push("/home")}
              backgroundColor="transparent"
              outline="none"
              _focus={{ border: 0 }}
              _hover={{ backgroundColor: "transparent" }}
              _active={{ outline: "none" }}
              icon={AiOutlineHome}
              aria-label="Navigate Home"
            />
            <BreadcrumbLink href="home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {Object.keys(book).length && (
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{book.volumeInfo?.title}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Wrapper>
      <PageLayout>
        {Object.keys(book).length && (
          <Box>
            <BookCard
              key={book.id}
              googleId={book.id}
              imageUrl={book.volumeInfo?.imageLinks?.thumbnail || ""}
              title={book.volumeInfo?.title}
              author={
                book.volumeInfo?.authors?.length
                  ? book.volumeInfo?.authors[0]
                  : "Unknown"
              }
              rating={book.volumeInfo?.averageRating || 0}
            />
            <Box borderBottom="1px solid rgb(217,217,217)" pb="1rem">
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
              >
                Description
              </Heading>
              <Box
                dangerouslySetInnerHTML={{
                  __html: book.volumeInfo.description,
                }}
              ></Box>
            </Box>
            <Box borderBottom="1px solid rgb(217,217,217)" pb="1rem">
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
                pt="1rem"
              >
                Information
              </Heading>
              <Box w={["50%", "75%", "75%", "100%"]}>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    as="i"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Title:
                  </Text>
                  <Text>{book.volumeInfo?.title}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    as="i"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Author(s):
                  </Text>
                  <Box>
                    {book.volumeInfo?.authors
                      ? book.volumeInfo?.authors?.map((x: string) => (
                          <>
                            <Text>{x}</Text>
                          </>
                        ))
                      : "Unknown"}
                  </Box>
                </Flex>
                <Flex flexWrap="wrap">
                  <Text
                    as="i"
                    fontWeight="bold"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Publisher:
                  </Text>
                  <Text>{book.volumeInfo?.publisher || "Unknown"}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    as="i"
                    fontWeight="bold"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    ISBN:
                  </Text>
                  <Text>
                    {book.volumeInfo?.industryIdentifiers
                      ? book.volumeInfo?.industryIdentifiers[0].identifier
                      : "Unknown"}
                  </Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    textDecor="bold"
                    as="i"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Length:
                  </Text>
                  <Text>{book.volumeInfo?.pageCount || "Unknown"}</Text>
                </Flex>
              </Box>
            </Box>
            <Box>
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
                pt="1rem"
              >
                Genres
              </Heading>
              <Flex wrap="wrap">
                {categoriesAlgo(book.volumeInfo?.categories).map(
                  (x: string) => {
                    return (
                      <Tag mr="0.7rem" mb="0.7rem" variantColor="teal">
                        {x}
                      </Tag>
                    );
                  }
                )}
              </Flex>
            </Box>
          </Box>
        )}
      </PageLayout>
    </>
  );
};

export default withApollo({ ssr: true })(BookPage);
