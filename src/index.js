import React, { Component } from "react";
import { createInlineManualPlayer } from "./inlineManual";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                createdAt: "2018-08-30T14:52:21.827Z",
                email: "xczvasdfasdfratiuraulcontact@gmail.com",
                firstName: "Svgator",
                id: "5b8804a51523ec123efe592c",
                lastName: "asdfasdf"
            }
        }
    }

    componentWillMount() {
        createInlineManualPlayer(this.state.user);
    }

    render() {
        return <div>test</div>;
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
