import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Container } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";

export default function Editor() {
  const [value, setValue] = useState("");

  return (
    <Container minW="100%" minH="80vh" bg="gray.100" centerContent p="0">
      <Toolbar editorData={value} />
      <Box padding="4" w="60%" m="0" mt="50px" mb="50px" boxShadow="xl">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="..."
        />
      </Box>
    </Container>
  );
}
