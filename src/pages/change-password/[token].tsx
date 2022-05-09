import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toErrorMap } from "../../utils/toErrorMap";
import { Formik, Form } from "formik";
import { Wrapper } from "../../components/Wrapper";
import { Button } from "@chakra-ui/button";
import { InputField } from "../../components/inputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { Box } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";

export const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  console.log(router.query);
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            {tokenError ? (
              <Box>
                <Box color="red">{tokenError}</Box>
                <NextLink href="/forgot-password">
                  click here to get a new one
                </NextLink>
              </Box>
            ) : null}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              backgroundColor="#E2E8F0"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
