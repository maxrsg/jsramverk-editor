import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button, Container } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";
import { getAllDocuments } from "../data/Documents";
import Editor from "./Editor";
import Dropdown from "../components/Dropdown";
import { useHistory } from "react-router";

export const START_URL = "/";

export default function Start() {
  const [documents, setDocuments] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    getDocumentData();
    console.log(documents);
  }, []);

  const getDocumentData = async () => {
    const data = await getAllDocuments();
    setDocuments(data);
  };

  const redirect = () => {
    history.push("/editor");
  };

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
        <Button bg="cyan.400" size="sm" onClick={redirect}>
          Create new
        </Button>
        <Dropdown documents={documents} />
      </Box>
    </Container>
  );
}
