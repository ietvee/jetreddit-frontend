import { Box } from "@chakra-ui/layout";
import React from "react";

// layout.tsx can use this also, reduce duplication
export type WrapperVariant = "small" | "regular";

interface WrapprProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapprProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
