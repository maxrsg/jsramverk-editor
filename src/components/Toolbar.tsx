import { Flex, Button, Spacer, Center } from "@chakra-ui/react";

interface Idata {
    editorData: String;
}

export default function Toolbar(props: Idata) {
  function printData() {
    if (props.editorData) {
      console.log(props.editorData);
    }
  }

  return (
    <Flex w="100vw" h="50" bg="gray.800">
      <Spacer />
      <Center w="5%" mr="20%">
        <Button bg="cyan.400" size="sm" onClick={printData}>
          Save
        </Button>
      </Center>
    </Flex>
  );
}