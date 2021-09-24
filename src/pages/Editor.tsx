import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Container, Input, InputGroup, Flex } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";
import { useParams } from "react-router";
import { IrecievedData, getOneDocument } from "../data/Documents";
import { ClipLoader } from "react-spinners";

export const EDITOR_URL_ID = "/editor/:id";
export const EDITOR_URL = "/editor";

export default function Editor() {
  const { id } = useParams<Record<string, string | undefined>>();
  const [editorValue, setEditorValue] = useState<string>("");
  const [documentData, setDocumentData] = useState<IrecievedData | null>();
  const [toolbarEdit, setToolbarEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getDocumentData = async () => {
      if (id) {
        const data = await getOneDocument(id);
        setDocumentData(data);
        setToolbarEdit(true);
      }
    };

    getDocumentData();
  }, [id]);

  useEffect(() => {
    if (documentData) {
      setEditorValue(documentData.data.data);
      setTitle(documentData.data.title);
    }
  }, [documentData]);

  const handleTitleChange = (title: any) => {
    setTitle(title.target.value);
  };

  const showToolbar = () => {
    if (id !== undefined) {
      return (
        <Toolbar
          editorData={{ _id: id, title: title, data: editorValue }}
          edit={toolbarEdit}
        />
      );
    } else {
      return (
        <Toolbar
          editorData={{ _id: "", title: title, data: editorValue }}
          edit={toolbarEdit}
        />
      );
    }
  };

  if (id && !documentData) {
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
        <Box padding="4" w="60%" m="0" mt="50px" mb="50px">
          <Flex alignItems="center" justifyContent="center" minH="600px">
            <ClipLoader></ClipLoader>
          </Flex>
        </Box>
      </Container>
    );
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
      {showToolbar()}
      <Box padding="4" w="60%" m="0" mt="50px" mb="50px" boxShadow="xl">
        <InputGroup mb="1rem">
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Title..."
            borderColor="black"
          />
        </InputGroup>
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={setEditorValue}
          placeholder="..."
        />
      </Box>
    </Container>
  );
}
