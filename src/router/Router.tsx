import { HashRouter, Route } from "react-router-dom";

import Start, { START_URL } from "../pages/Start";
import Editor, {
  EDITOR_URL,
  EDITOR_URL_ID,
  EDITOR_URL_CREATOR,
} from "../pages/Editor";
import Footer from "../components/Footer";
import Login, { LOGIN_URL } from "../pages/Login";
import Register, { REGISTER_URL } from "../pages/Register";
import Profile, { PROFILE_URL } from "../pages/Profile";

export function Router() {
  return (
    <HashRouter basename="/">
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
      <Route exact path={EDITOR_URL_CREATOR}>
        <div className="main-container">
          <Editor />
          <Footer />
        </div>
      </Route>
      <Route exact path={LOGIN_URL}>
        <div className="main-container">
          <Login />
          <Footer />
        </div>
      </Route>
      <Route exact path={REGISTER_URL}>
        <div className="main-container">
          <Register />
          <Footer />
        </div>
      </Route>
      <Route exact path={PROFILE_URL}>
        <div className="main-container">
          <Profile />
          <Footer />
        </div>
      </Route>
    </HashRouter>
  );
}
