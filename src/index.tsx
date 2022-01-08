import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppRoutes } from "./router/index";

import "./ui/index.css";

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <AppRoutes />
    </Router>
  </RecoilRoot>,
  document.getElementById("root")
);
