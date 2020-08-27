import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { PageLayout } from "../../components/PageLayout";
import { withApollo } from "../../utils/withApollo";
import { BookCard } from "../../components/BookCard";
import { useRouter } from "next/router";
import { SearchBooks } from "../../components/SearchBooks";
import { Box, Text, Heading, Flex, Tag } from "@chakra-ui/core";
import { useMeQuery } from "../../generated/graphql";

interface BookPageProps {}

const BookPage: React.FC<BookPageProps> = ({}) => {
  const { data } = useMeQuery();
  const router = useRouter();
  if (!data || !data?.me) router.push("/");
  const [book, setBook] = useState<any>({});
  const categoriesAlgo = (x: string[]) => {
    let myarray: string[] = [];
    x.forEach((y: string) => {
      myarray = [...myarray, ...y.split("/")];
    });
    return myarray.filter((z: string, b: number) => myarray.indexOf(z) === b);
  };
  const initialSearch = async () => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${router.query.pid}`
    );
    const jsonRes = await res.json();
    if (!jsonRes.volumeInfo) {
      router.push("/home");
    } else {
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
      <PageLayout>
        {Object.keys(book).length > 0 && (
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
                      <Tag
                        mr="0.7rem"
                        mb="0.7rem"
                        backgroundColor="teal.400"
                        color="white"
                      >
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
