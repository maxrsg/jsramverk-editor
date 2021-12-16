import "react-quill/dist/quill.snow.css";
import { Box, Container, Heading, Link, Text } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";
import { LoginForm } from "../components/LoginForm";

export const LOGIN_URL = "/login";

export default function Login() {
  const url = process.env.REACT_APP_URL + `/#/register`;
  console.log(url);
  return (
    <Container
      minW="100%"
      minH="90vh"
      bg="gray.100"
      centerContent
      p="0"
      display="flex"
      className="editor-container"
    >
      <Toolbar empty={true} />
      <Box padding="4" w="60%" m="0" mt="50px" mb="50px" boxShadow="xl">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" fontWeight="medium">
          <Text as="span">Don&apos;t have an account? </Text>
          <Link color="cyan.700" href={url}>
            Register here!
          </Link>
        </Text>
        <Box>
          <LoginForm />
        </Box>
      </Box>
    </Container>
  );
}
