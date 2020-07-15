import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch
} from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";

import { NotFoundPage } from "./components/pages/NotFound";
import { ExampleListPage } from "./components/pages/ExampleList";
import { ProfileListPage } from "./components/pages/ProfileList";
import { SearchResultPage } from "./components/pages/Search";
import { LoginPage } from "./components/pages/Login";
import { HomePage } from "./components/pages/Home";
import { config } from "./utils/oktaConfig";
import { LoadingComponent } from "./components/common";

// Import some styling
import "./styles/App.css";
import { Landing } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";

import { ThemeProvider } from "@chakra-ui/core";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push("/login");
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path="/home"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/example-list" component={ExampleListPage} />
        <SecureRoute path="/profile-list" component={ProfileListPage} />
        <Route path="/search" component={SearchResultPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
