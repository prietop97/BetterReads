import React from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  component: React.FC;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: PrivateComponent,
}) => {
  const router = useRouter();
  const { error } = useMeQuery();
  if (error && error.message === "GraphQL error: Not Authenticated") {
    router.push("/");
    return <></>;
  }
  return <PrivateComponent />;
};
