import { combineReducers, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import Auth from "./Auth"
import Location from "./Location";
import Documents from "./Documents";

export default combineReducers({
  Auth: Auth,
  Location: Location,
  // SignUp: SignUp,
  Documents: Documents,
}) 