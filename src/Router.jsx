import React from "react";
import history from "./services/history";
import { Router, Switch, Route } from "react-router-dom";
import View from "./components/view/View";
import Home from "./components/Home";
import NotFound from "./components/notFound/NotFound";
const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/tool",
    component: View,
    exact: true,
  },

  {
    path: "*",
    component: NotFound,
  },
];

export default function AppRouter(props) {
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

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <>
          <route.component {...props} routes={route.routes} />
        </>
      )}
    />
  );
}
