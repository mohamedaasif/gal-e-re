import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { GlobalStyle } from "./styled-components/globalStyles";
import Footer from "./components/Footer/Footer";
import ChangePassword from "./components/ChangePassword";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import DeleteAccount from "./components/DeleteAccount";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/changepassword" component={ChangePassword} />

          <Route path="/profile">
            <ProtectedRoutes component={Profile} />
          </Route>
          <Route path="/deleteaccount">
            <ProtectedRoutes component={DeleteAccount} />
          </Route>
          <Route path="/createpost">
            <ProtectedRoutes component={CreatePost} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
