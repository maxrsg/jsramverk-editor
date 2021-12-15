import { Flex, Button, Spacer, Center, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { createNewDocument, updateDocument, Document } from "../data/Documents";

interface Idata {
  editorData?: Document | null;
  empty?: Boolean;
  edit?: Boolean;
}

export default function Toolbar(props: Idata) {
  const history = useHistory();
  const cookies = new Cookies();
  const [isLoggedIn, setLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    if (cookies.get("token")) {
      setLoggedIn(true);
    }
  }, []);

  const handleUpdate = async () => {
    if (props.editorData) {
      await updateDocument(
        props.editorData._id,
        props.editorData.title,
        props.editorData.data,
        props.editorData.allowedUsers
      );
      window.location.reload();
    }
  };

  const handleCreate = async () => {
    if (props.editorData) {
      if (props.editorData.title && props.editorData.data) {
        await createNewDocument(
          props.editorData.title,
          props.editorData.data,
          props.editorData.allowedUsers
        );
        history.push("/");
      }
    }
  };

  const renderLogin = () => {
    if (!isLoggedIn) {
      return (
        <Link as={RouteLink} to="/login" p="1rem" color="#fff">
          Login
        </Link>
      );
    } else {
      return (
        <Link as={RouteLink} to="/profile" p="1rem" color="#fff">
          Profile
        </Link>
      );
    }
  };

  if (props.edit) {
    return (
      <Flex w="100%" h="50px" bg="gray.800" m="0">
        <Link as={RouteLink} to="/" p="1rem" color="#fff">
          Home
        </Link>
        {renderLogin()}
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
        {renderLogin()}
        <Spacer />
        <Center w="5%" mr="20%"></Center>
      </Flex>
    );
  } else {
    let disabled: boolean = true;
    if (props.editorData) {
      if (props.editorData.title && props.editorData.data) {
        disabled = false;
      }
    }

    return (
      <Flex w="100%" h="50px" bg="gray.800" m="0">
        <Link as={RouteLink} to="/" p="1rem" color="#fff">
          Home
        </Link>
        {renderLogin()}
        <Spacer />
        <Center w="5%" mr="20%">
          <Button
            isDisabled={disabled}
            bg="cyan.400"
            size="sm"
            onClick={handleCreate}
          >
            Create
          </Button>
        </Center>
      </Flex>
    );
  }
}
