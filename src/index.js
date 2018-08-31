import React, { Component } from "react";
import { createInlineManualPlayer } from "./inlineManual";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  state = {
    user: {
      createdAt: "2018-08-30T14:52:21.827Z",
      email: "xczvasdfasdfratiuraulcontact@gmail.com",
      firstName: "Svgator",
      id: "5b8804a51523ec123efe592c",
      lastName: "asdfasdf"
    }
  };

  componentWillMount() {
    createInlineManualPlayer(this.state.user);
  }

  render() {
    return <h1>Inline manual</h1>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
