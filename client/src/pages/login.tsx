import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Button } from "@chakra-ui/core";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login(values);
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data.login.user) {
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
export default Login;
