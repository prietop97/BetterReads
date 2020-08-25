import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { SearchBooks } from "../components/SearchBooks";
import { withApollo } from "../utils/withApollo";
import { PageLayout } from "../components/PageLayout";
import {
  Flex,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  IconButton,
} from "@chakra-ui/core";
import { NextPage } from "next";
import { BookCard } from "../components/BookCard";
import { useRouter } from "next/router";
import { Wrapper } from "../components/Wrapper";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";

interface searchProps {}

const Search: NextPage<any> = (props) => {
  const router = useRouter();
  //   const [query,setQuery]
  const [results, setResults] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [fetchMore, setFetchMore] = useState(false);
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const initialSearch = async () => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${router.query.name}`
    );
    const jsonRes = await res.json();
    console.log(jsonRes);
    setResults(jsonRes.items);
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
      console.log(jsonRes);
    } catch (error) {
      console.log(error);
    }
  };

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
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Search</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Wrapper>
      <PageLayout showShelfSmall={false}>
        <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
          {results.map((book: any) => (
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
          ))}
          {total && fetchMore ? (
            <Button
              isLoading={additionalLoading}
              fontWeight={500}
              bg="transparent"
              width="100%"
              margin="1rem 0"
              fontSize="1rem"
              color="#547862"
              border="1px solid rgb(217,217,217)"
              lineHeight="1.375rem"
              cursor="pointer"
              //   _hover="none"
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

export default withApollo({ ssr: true })(Search);
