import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Container } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";

export default function Editor() {
  const [value, setValue] = useState("");

  return (
    <Container maxW="100vw" h="100vh" bg="gray.100" centerContent>
      <Toolbar editorData={value} />
      <Box padding="4" w="60%" minH="300" mt="50px">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Box>
    </Container>
  );
}