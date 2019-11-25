/* import - node_modules */
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
/* import - routes */
import routes from "../../routes";
/* import - COMPONENT */
import HomePageContainer from "../../page/HomePage/HomePageContainer";
import LoginPage from "../../page/LoginPage/LoginPage";
import Navigation from "../Navigation/Navigation";
import FormPage from "../../page/FormPage/FormPage";

/*
 * COMPONENT
 */
const App = () => (
  <BrowserRouter>
    <Navigation />

    <Switch>
      <Route exact path={routes.HOME_PAGE} component={HomePageContainer} />
      <Route path={routes.LOGIN_PAGE} component={LoginPage} />
      <Route path={routes.FORM_PAGE} component={FormPage} />

      <Redirect to={routes.HOME_PAGE} />
    </Switch>
  </BrowserRouter>
);

export default App;
