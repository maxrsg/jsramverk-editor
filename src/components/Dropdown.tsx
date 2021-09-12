import { useEffect, useState } from "react";
import Select from "react-select";
import { Document } from "../data/Documents";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

interface IdataToFormat {
  documents: any;
}

interface IselectElement {
  value: string;
  label: string;
}

export default function Dropdown(props: IdataToFormat) {
  const [selectData, setSelectData] = useState(Array<IselectElement>());
  const [selectedDocument, setSelectedDocument] =
    useState<IselectElement | null>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    formatData();
    setSelectedDocument(null);
  }, [props]);

  const formatData = () => {
    if (props.documents) {
      let formatted: Array<IselectElement> = [];
      props.documents.data.forEach((e: Document) => {
        let doc = { value: e._id, label: e.title };
        formatted.push(doc);
      });
      setSelectData(formatted);
    }
  };

  const handleChange = (selected: any) => {
    setSelectedDocument(selected);
    setIsReady(true);
  };

  const redirect = () => {
    history.push("/editor/" + selectedDocument?.value);
  };

  return (
    <Flex w="100%">
      <Box w="50%">
        <Select options={selectData} onChange={handleChange} />
      </Box>
      <Button
        bg="cyan.400"
        size="md"
        ml="1rem"
        isDisabled={!isReady}
        _disabled={{ bg: "gray.400", cursor: "default" }}
        onClick={redirect}
      >
        Edit
      </Button>
    </Flex>
  );
}
