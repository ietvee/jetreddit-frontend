import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

// const Index = () => {
//   const [variables, setVariables] = useState({
//     limit: 33,
//     cursor: null as null | string,
//   });
//   const [{ data, fetching }] = usePostsQuery({
//     variables,
//   });
//   if (!fetching && !data) {
//     return <div> you got no posts. </div>;
//   }
//   return (
//     <Layout>
//       <Flex align="center">
//         <Heading>JetReddit</Heading>
//         <NextLink href="/create-post">
//           <Link ml="auto">create post</Link>
//         </NextLink>
//       </Flex>
//       <br />
//       {!data && fetching ? (
//         <div>loading...</div>
//       ) : (
//         <Stack spacing={8}>
//           {/* "!" to declare it is defined */}
//           {data!.posts.posts.map((p) => (
//             <Box key={p.id} p={5} shadow="md" borderWidth="1px">
//               <Heading fontSize="xl">{p.title}</Heading>s
//               <Text mt={4}>{p.textSnippet}</Text>
//             </Box>
//           ))}
//         </Stack>
//       )}
//       {data && data.posts.hasMore ? (
//         <Flex>
//           <Button
//             onClick={() => {
//               setVariables({
//                 limit: variables.limit,
//                 cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
//               });
//             }}
//             isLoading={fetching}
//             m="auto"
//             my={8}
//           >
//             load more
//           </Button>
//         </Flex>
//       ) : null}
//     </Layout>
//   );
// };
// export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text> posted by {p.creator.username} </Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>

                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
