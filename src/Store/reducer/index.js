import { combineReducers, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import Auth from "./Auth"
import SignUp from "./SignUp";

export default combineReducers({
  Auth: Auth,
  SignUp: SignUp,
}) 