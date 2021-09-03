import './App.scss';
import { ChakraProvider } from "@chakra-ui/react";
import Editor from "./pages/Editor";

function App() {
  return (
    <ChakraProvider>
      <Editor />
    </ChakraProvider>
  );
}

export default App;
