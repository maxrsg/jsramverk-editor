import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Container, Input, InputGroup, Flex } from "@chakra-ui/react";
import Toolbar from "../components/Toolbar";
import CreateableSelect from "react-select/creatable";
import "./Editor.scss";
import { useParams } from "react-router";
import { IrecievedData, getOneDocument } from "../data/Documents";
import { ClipLoader } from "react-spinners";
import socketIOClient from "socket.io-client";
import { OptionsType } from "react-select/src/types";
import Cookies from "universal-cookie";

export const EDITOR_URL_ID = "/editor/:id";
export const EDITOR_URL_CREATOR = "/editor/:docId/:creator";
export const EDITOR_URL = "/editor";
const ENDPOINT = process.env.REACT_APP_API || "http://localhost:1337";

const socket = socketIOClient(ENDPOINT);

interface selectElement {
  label: string;
  value: string;
}

interface docData {
  _id: string | undefined;
  title: string;
  data: string;
  user?: string;
  allowedUsers: Array<string>;
  creator?: string;
}

export default function Editor() {
  const { id } = useParams<Record<string, string | undefined>>();
  const { docId } = useParams<Record<string, string | undefined>>();
  const { creator } = useParams<Record<string, string | undefined>>();
  const [editorValue, setEditorValue] = useState<string>("");
  const [documentData, setDocumentData] = useState<IrecievedData | null>();
  const [toolbarEdit, setToolbarEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [addedUsers, setAddedUsers] = useState<OptionsType<selectElement>>();
  const [allowedUsers, setAllowedUsers] = useState(Array<string>());
  const [documentId, setDocumentId] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const cookies = new Cookies();

  useEffect(() => {
    const getDocumentData = async () => {
      if (creator && docId) {
        const data = await getOneDocument(docId, creator);
        setDocumentData(data);
        setToolbarEdit(true);
        setDocumentId(docId);

        socket.emit("create", docId);
      } else if (id) {
        const data = await getOneDocument(id);
        setDocumentData(data);
        setToolbarEdit(true);
        setDocumentId(id);

        socket.emit("create", id);
      }
    };

    getDocumentData();
  }, [creator, id, docId]);

  useEffect(() => {
    if (documentData) {
      setEditorValue(documentData.data.data);
      setTitle(documentData.data.title);
    }
  }, [documentData]);

  useEffect(() => {
    if (addedUsers) {
      let users: Array<string> = [];
      addedUsers.map((e: selectElement) => {
        users.push(e.value);
      });
      setAllowedUsers(users);
    }
  }, [addedUsers]);

  useEffect(() => {
    if (cookies.get("email")) {
      setUser(cookies.get("email"));
    }
  }, [cookies]);

  const handleTitleChange = (title: any) => {
    setTitle(title.target.value);
  };

  const handleUsers = (users: OptionsType<selectElement>) => {
    console.log(users);
    setAddedUsers(users);
  };

  socket.on("doc", (data) => {
    setTitle(data.title);
    setEditorValue(data.data);
  });

  const updateDocumentViaSocket = () => {
    const docData: docData = {
      _id: documentId,
      title: title,
      data: editorValue,
      user: user,
      allowedUsers: allowedUsers,
    };

    if (creator) {
      docData["creator"] = creator;
    }

    socket.emit("doc", docData);
  };

  const showToolbar = () => {
    if (documentId !== undefined) {
      return (
        <Toolbar
          editorData={{
            _id: documentId,
            title: title,
            data: editorValue,
            allowedUsers: allowedUsers,
          }}
          edit={toolbarEdit}
          creator={creator}
        />
      );
    } else {
      return (
        <Toolbar
          editorData={{
            _id: "",
            title: title,
            data: editorValue,
            allowedUsers: allowedUsers,
          }}
          edit={toolbarEdit}
        />
      );
    }
  };

  if (documentId && !documentData) {
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
        <CreateableSelect
          className="addUsers"
          isMulti
          placeholder="Add users to this document"
          noOptionsMessage={() =>
            "Input the email address of the users you want to add"
          }
          onChange={handleUsers}
        />
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
