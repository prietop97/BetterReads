import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch
} from "react-router-dom";

import { NotFoundPage } from "./components/pages/NotFound";
import { ExampleListPage } from "./components/pages/ExampleList";
import { ProfileListPage } from "./components/pages/ProfileList";
import { SearchResultPage } from "./components/pages/Search";
import { HomePage } from "./components/pages/Home";
import { LoadingComponent } from "./components/common";

// Import some styling
import "./styles/App.css";
import { Landing } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { SearchProvider } from "./state/context/SearchContext";

import { ThemeProvider } from "@chakra-ui/core";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ThemeProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route
        path="/home"
        exact
        component={() => <HomePage LoadingComponent={LoadingComponent} />}
      />
      <Route path="/example-list" component={ExampleListPage} />
      <Route path="/profile-list" component={ProfileListPage} />
      <Route path="/search" component={SearchResultPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
