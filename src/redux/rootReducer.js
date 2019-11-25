import { combineReducers } from "redux";

import homePageReducer from "./homePage/homePageReducer";
import formPageReducer from "./form/formReducer";
// import loginPageReducer from "./login/loginReducer2";
import loginPageReducer from "./login/loginReducer";

export default combineReducers({
  homePage: homePageReducer,
  loginPage: loginPageReducer,
  formPage: formPageReducer
});
