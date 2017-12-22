// var react = require("react")
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./root.jsx";


ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./root.jsx", () => {
    const NewRoot = require("./root.jsx").default;
    ReactDOM.render(
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
