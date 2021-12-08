import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";
import { useHistory } from "react-router";
import { RegisterForm } from "../components/RegisterForm";

export const REGISTER_URL = "/register";

export default function Register() {
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
          Create a new account!
        </Heading>
        <Box>
          <RegisterForm />
        </Box>
      </Box>
    </Container>
  );
}
