import { BrowserRouter, Route } from "react-router-dom";

import Start, { START_URL } from "../pages/Start";
import Editor, { EDITOR_URL, EDITOR_URL_ID } from "../pages/Editor";
import Footer from "../components/Footer";

export function Router() {
  return (
    <BrowserRouter>
      <Route exact path={START_URL}>
        <div className="main-container">
          <Start />
          <Footer />
        </div>
      </Route>
      <Route exact path={EDITOR_URL}>
        <div className="main-container">
          <Editor />
          <Footer />
        </div>
      </Route>
      <Route exact path={EDITOR_URL_ID}>
        <div className="main-container">
          <Editor />
          <Footer />
        </div>
      </Route>
    </BrowserRouter>
  );
}
