import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Container, Input, InputGroup, Flex } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import "./Editor.scss";
import { useParams } from "react-router";
import { IrecievedData, getOneDocument } from "../data/Documents";
import { ClipLoader } from "react-spinners";
import socketIOClient from "socket.io-client";

export const EDITOR_URL_ID = "/editor/:id";
export const EDITOR_URL = "/editor";
const ENDPOINT = process.env.REACT_APP_API || "http://localhost:1337";

const socket = socketIOClient(ENDPOINT);

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

        socket.emit("create", id);
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

  socket.on("doc", (data) => {
    setTitle(data.title);
    setEditorValue(data.data);
  });

  const updateDocumentViaSocket = () => {
    const docData = {
      _id: id,
      title: title,
      data: editorValue,
    };

    socket.emit("doc", docData);
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
            onKeyUp={updateDocumentViaSocket}
            placeholder="Title..."
            borderColor="black"
          />
        </InputGroup>
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={setEditorValue}
          onKeyUp={updateDocumentViaSocket}
          placeholder="..."
        />
      </Box>
    </Container>
  );
}
