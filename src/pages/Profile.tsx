import "react-quill/dist/quill.snow.css";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const PROFILE_URL = "/profile";

export default function Profile() {
  const cookies = new Cookies();
  const [isLoggedIn, setLoggedIn] = useState<Boolean | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    if (cookies.get("token")) {
      setLoggedIn(true);
    }
    setEmail(cookies.get("email"));
  });

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("email");
    history.push("/login");
  };

  if (isLoggedIn !== undefined && !isLoggedIn) {
    history.push("/login");
  }

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
        <Heading textAlign="center" size="sm" fontWeight="extrabold">
          You're logged in as: <Text color="cyan.400">{email}</Text>
        </Heading>

        <Text mt="4" mb="8" align="center" fontWeight="medium">
          <Button colorScheme="cyan" onClick={logOut}>
            Log out
          </Button>
        </Text>
      </Box>
    </Container>
  );
}
