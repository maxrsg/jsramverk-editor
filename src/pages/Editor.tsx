import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Container } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";

export const EDITOR_URL_ID = "/editor/:id";
export const EDITOR_URL = "/editor";

interface IeditorProps {
  id?: String;
}

export default function Editor(props: IeditorProps) {
  const [value, setValue] = useState("");

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
