import React from "react";
import { NavBar } from "../../components/NavBar";
import { SearchBooks } from "../../components/SearchBooks";
import { Wrapper } from "../../components/Wrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  IconButton,
  BreadcrumbLink,
} from "@chakra-ui/core";
import { AiOutlineHome } from "react-icons/ai";
import { PageLayout } from "../../components/PageLayout";
import { useRouter } from "next/router";
import { withApollo } from "../../utils/withApollo";

interface ShelfPageProps {}

const ShelfPage: React.FC<ShelfPageProps> = ({}) => {
  const router = useRouter();
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
            <BreadcrumbLink href="#">{router.query.pid}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Wrapper>
      <PageLayout>HEY</PageLayout>
    </>
  );
};

export default withApollo({ ssr: true })(ShelfPage);
