import { Box, Text, Link, Stack } from "@chakra-ui/react";
import "./Footer.scss";

export default function Footer() {
  return (
    <Box
      as="footer"
      mx="auto"
      maxW="100vw"
      py="12"
      px={{ base: "4", md: "8" }}
      bg="gray.800"
    >
      <Stack direction="row" spacing="4" align="end" justify="space-between">
        <Text fontSize="sm" color="gray.400">
          {" "}
          &copy; {new Date().getFullYear()} Max Gotenstam
        </Text>
        <Text color="gray.100">
          This website is made as a part of the course
          <Link href="https://jsramverk.se/" isExternal color="cyan.400">
            {" "}
            jsramverk
          </Link>
        </Text>
      </Stack>
    </Box>
  );
}
