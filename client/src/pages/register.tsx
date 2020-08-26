import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Button } from "@chakra-ui/core";
import { withApollo } from "../utils/withApollo";

interface Send {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
}

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const sendValues: Send = { ...values };
          delete sendValues.confirmPassword;
          const response = await register({
            variables: sendValues,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/home");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="name"
              placeholder="Enter your name"
              label="Full Name"
            />
            <InputField
              name="email"
              placeholder="Enter your email"
              label="Email Address"
            />
            <InputField
              name="password"
              placeholder="Enter a password"
              label="Password"
              type="password"
            />
            <InputField
              name="confirmPassword"
              placeholder="Reenter your password"
              label="Confirm Password"
              type="password"
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              isFullWidth
              variantColor="blue"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: true })(Register);
