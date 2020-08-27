import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { SearchBooks } from "../components/SearchBooks";
import { PageLayout } from "../components/PageLayout";
import { Flex, Button } from "@chakra-ui/core";
import { NextPage } from "next";
import { BookCard } from "../components/BookCard";
import { useRouter } from "next/router";

const Search: NextPage<any> = () => {
  const router = useRouter();
  const [results, setResults] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [fetchMore, setFetchMore] = useState(false);
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const initialSearch = async () => {
    setInitialLoading(true);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${router.query.name}`
    );
    const jsonRes = await res.json();
    setResults(jsonRes.items);
    setInitialLoading(false);
    setTotal(jsonRes.totalItems);
    setFetchMore(jsonRes.totalItems > results.length + jsonRes.items.length);
  };

  useEffect(() => {
    try {
      setResults([]);
      setTotal(0);
      setFetchMore(false);
      setAdditionalLoading(false);
      initialSearch();
    } catch (error) {
      console.log(error);
    }
  }, [router.query.name]);

  const fetchMoreData = async () => {
    try {
      setAdditionalLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${router.query.name}&startIndex=${results.length}`
      );
      const jsonRes = await res.json();
      setResults([...results, ...jsonRes.items]);
      setFetchMore(jsonRes.totalItems > results.length + jsonRes.items.length);
      setTotal(jsonRes.totalItems);
      setAdditionalLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <SearchBooks />
      <PageLayout>
        <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
          {!initialLoading
            ? results.map((book: any) => (
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
              ))
            : "Loading..."}
          {total && fetchMore ? (
            <Button
              isLoading={additionalLoading}
              fontWeight={500}
              bg="transparent"
              width="100%"
              margin="1rem 0"
              fontSize="1rem"
              color="teal.400"
              border="1px solid #6d9a7f"
              lineHeight="1.375rem"
              cursor="pointer"
              _hover={{ backgroundColor: "teal.400", color: "white" }}
              onClick={() => fetchMoreData()}
            >
              Load More
            </Button>
          ) : null}
        </Flex>
      </PageLayout>
    </>
  );
};

export default Search;
