import { combineReducers, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import Auth from "./Auth"
import Location from "./Location";

export default combineReducers({
  Auth: Auth,
  Location: Location,
  // SignUp: SignUp,
}) 