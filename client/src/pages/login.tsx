import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Button } from "@chakra-ui/core";
import { AuthWrapper } from "../components/AuthWrapper";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <AuthWrapper
      heading="Login to BetterReads"
      redirectText="Don't have an account?"
      redirectText2="Regisiter here."
      redirectLink="/register"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/home");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="Enter your email"
              label="Email Address"
            />
            <InputField
              name="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
            />
            <Button
              mt="1rem"
              type="submit"
              isLoading={isSubmitting}
              isFullWidth
              backgroundColor="teal.400"
              color="white"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </AuthWrapper>
  );
};
export default Login;
