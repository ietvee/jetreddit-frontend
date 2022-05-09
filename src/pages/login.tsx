import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/inputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRegisterMutation, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
// import { createUrqlClient } from "../utils/createurqlClient";
interface registerProps {}

// const REGISTER_MUT = `  mutation Register($username: String!, $password:String!){
//     register(options: { username: $username, password: $password}){
//       errors{
//         field
//         message
//       }
//       user{
//         id
//         username
//       }
//     }
//   }
//   `;

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  //  userLoginMutation is a custom hook from graphql code gen
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login(values);
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              {" "}
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Flex mt={4}>
                <Box ml="auto">
                  <NextLink href="/forgot-password">forgot password?</NextLink>
                </Box>
              </Flex>
            </Box>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              backgroundColor="#E2E8F0"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
