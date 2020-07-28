import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function BreadCrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink
          as={Link}
          to="/dashboard"
          _visited="#f3f3f3"
          display="flex"
          color="#dbdbdb"
        >
          <FaHome />
          <Text
            paddingY="0"
            marginY="0"
            textDecoration="none"
            style={{ textDecoration: "none" }}
          >
            Dashboard
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
