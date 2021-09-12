import { Flex, Button, Spacer, Center } from "@chakra-ui/react";
import {
  createNewDocument,
  deleteDocument,
  getAllDocuments,
  getOneDocument,
  updateDocument,
} from "../data/Documents";

interface Idata {
  editorData?: String;
  empty?: Boolean;
}

export default function Toolbar(props: Idata) {
  function printData() {
    if (props.editorData) {
      console.log(props.editorData);
      getAllDocuments();
      getOneDocument("613b5d2f0e337bb556de85b0");
      // createNewDocument("post test1", "post test1");
      // updateDocument("613c8d1b837f9d2f72518f88", "test4", "test4");
      // deleteDocument("613c8d1b837f9d2f72518f88");
    }
  }

  if (props.empty) {
    return (
      <Flex w="100%" h="50px" bg="gray.800" m="0">
        <Spacer />
        <Center w="5%" mr="20%"></Center>
      </Flex>
    );
  } else {
    return (
      <Flex w="100%" h="50px" bg="gray.800" m="0">
        <Spacer />
        <Center w="5%" mr="20%">
          <Button bg="cyan.400" size="sm" onClick={printData}>
            Save
          </Button>
        </Center>
      </Flex>
    );
  }
}
