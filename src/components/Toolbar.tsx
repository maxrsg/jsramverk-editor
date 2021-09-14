import { Flex, Button, Spacer, Center, Link } from "@chakra-ui/react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { createNewDocument, updateDocument, Document } from "../data/Documents";

interface Idata {
  editorData?: Document | null;
  empty?: Boolean;
  edit?: Boolean;
}

export default function Toolbar(props: Idata) {
  const history = useHistory();

  const handleUpdate = () => {
    if (props.editorData) {
      updateDocument(
        props.editorData._id,
        props.editorData.title,
        props.editorData.data
      );
      window.location.reload();
    }
  };

  const handleCreate = () => {
    if (props.editorData) {
      if (props.editorData.title && props.editorData.data) {
        createNewDocument(props.editorData.title, props.editorData.data);
        history.push("/");
      }
    }
  };

  if (props.edit) {
    return (
      <Flex w="100%" h="50px" bg="gray.800" m="0">
        <Link as={RouteLink} to="/" p="1rem" color="#fff">
          Home
        </Link>
        <Spacer />
        <Center w="5%" mr="20%">
          <Button bg="cyan.400" size="sm" onClick={handleUpdate}>
            Update
          </Button>
        </Center>
      </Flex>
    );
  } else if (props.empty) {
    return (
      <Flex w="100%" h="50px" bg="gray.800" m="0">
        <Link as={RouteLink} to="/" p="1rem" color="#fff">
          Home
        </Link>
        <Spacer />
        <Center w="5%" mr="20%"></Center>
      </Flex>
    );
  } else {
    return (
      <Flex w="100%" h="50px" bg="gray.800" m="0">
        <Link as={RouteLink} to="/" p="1rem" color="#fff">
          Home
        </Link>
        <Spacer />
        <Center w="5%" mr="20%">
          <Button bg="cyan.400" size="sm" onClick={handleCreate}>
            Create
          </Button>
        </Center>
      </Flex>
    );
  }
}
