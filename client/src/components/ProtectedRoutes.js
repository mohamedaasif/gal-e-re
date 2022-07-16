import { Redirect } from "react-router-dom";
import { token } from "../utils/constants/constants";

const ProtectedRoutes = ({ component }) => {
  const Component = component;
  const isAuthenticated = token;

  return <>{isAuthenticated ? <Component /> : <Redirect to="/" />}</>;
};

export default ProtectedRoutes;
