import { useEffect, useState } from "react";
import { getAllDocuments } from "../data/Documents";
import {
  Box,
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function ShowDocuments() {
  const [documents, setDocuments] = useState<any>();

  useEffect(() => {
    const getDocumentData = async () => {
      const data = await getAllDocuments();
      setDocuments(data);
      console.log(data);
    };

    getDocumentData();
  }, []);

  if (documents) {
    return (
      <Flex w="100%">
        <Box w="100%">
          <Table variant="striped" colorScheme="cyan">
            <Thead>
              <Tr>
                <Th fontWeight="800" color="gray.800">
                  Your documents:
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.data.map((doc: any) => {
                console.log(doc);
                return (
                  <Tr key={doc._id}>
                    <Td fontWeight="600">
                      <Link color="cyan.800" to={`/editor/${doc._id}`}>
                        {doc.title}
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box w="100%">
        <Center>
          <ClipLoader></ClipLoader>
        </Center>
      </Box>
    );
  }
}
