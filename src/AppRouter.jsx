import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/";
import Tool from "./components/Tool/";
// import View from "./components/view/View";
import history from "./services/history";
import { NotFound } from "./components/NotFound/NotFound";
import View from "./components/view/View";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/view",
    component: View,
    exact: true,
  },
  {
    path: "/tool",
    component: Tool,
    exact: true,
  },

  {
    path: "*",
    component: NotFound,
  },
];

export class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    );
  }
}

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
