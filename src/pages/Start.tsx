import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Box, Button, Container } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";
import { getAllDocuments } from "../data/Documents";
// import Dropdown from "../components/Dropdown";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import ShowDocuments from "../components/ShowDocs";

export const START_URL = "/";

export default function Start() {
  const [documents, setDocuments] = useState<any>();
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    getDocumentData();
  }, []);

  const getDocumentData = async () => {
    const data = await getAllDocuments();
    setDocuments(data);
    console.log(data);
  };

  const redirect = () => {
    history.push("/editor");
  };

  if (!cookies.get("token")) {
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
        <Button
          bg="cyan.400"
          fontWeight="700"
          size="sm"
          onClick={redirect}
          mb="1rem"
        >
          Create new
        </Button>
        <ShowDocuments></ShowDocuments>
      </Box>
    </Container>
  );
}
