import loggedReducer from "./isLogged";
import userDeletedReducer from "./isUserDeleted";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  isDeleted: userDeletedReducer,
});

export default allReducers;
