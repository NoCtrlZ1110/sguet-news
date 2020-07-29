import React from "react";

import "./App.css";
import { AppRouter } from "./AppRouter";
import history from "./services/history";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router history={history}>
      <AppRouter />
    </Router>
  );
}

export default App;
