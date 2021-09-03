import "./App.scss";
import { ChakraProvider } from "@chakra-ui/react";
import Editor from "./pages/Editor";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider>
      <div className="main-container">
        <Editor />
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
