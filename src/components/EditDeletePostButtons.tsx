import { IconButton } from "@chakra-ui/button";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/react";
import React from "react";

import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink
        href="/post/edit/[id]"
        as={`
/post/edit/${id}`}
      >
        <IconButton
          as={Link}
          mr={4}
          variant="outline"
          aria-label="Edit post"
          textColor="blue"
          icon={<EditIcon w={4} h={4} />}
        />
      </NextLink>
      <IconButton
        variant="outline"
        aria-label="delete post"
        textColor="red"
        onClick={() => {
          deletePost({ id });
        }}
        icon={<DeleteIcon w={4} h={4} />}
      />
    </Box>
  );
};
