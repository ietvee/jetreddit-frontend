import { withUrqlClient } from "next-urql";
import router, { Router, useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import { Wrapper } from "../../../components/Wrapper";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import createPost from "../../create-post";
import { Formik, Form } from "formik";
import { InputField } from "../../../components/inputField";
import { Box, Button } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUql";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  if (fetching) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values) => {
            // console.log(values);
            //   const { error } = await createPost({ input: values });
            //   console.log("error :", error);
            //   if (!error) {
            //     router.push("/");
            //   }
            await updatePost({ id: intId, ...values });
            router.back();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Title" />
              <Box mt={4}>
                <InputField
                  textarea
                  name="text"
                  placeholder="text..."
                  label="Body"
                />
              </Box>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                backgroundColor="#E2E8F0"
              >
                Update Post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
