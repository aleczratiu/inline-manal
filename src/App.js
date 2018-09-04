import React, { Component } from 'react';
import { createInlineManualPlayer, updateInlineManualPlayer } from "./inlineManual";

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
      // Moved to `componentDidMount`, since the player require for DOM elements
      // to exist.
    }

    componentDidMount() {
      createInlineManualPlayer(this.state.user)
        // Receive loaded, created & initialized player instance.
        .then(player => {
          // Reset unmatchable topic condition.
          // This should be done differently during the authoring,
          // as was mentioned in the e-mail.
          player.topics['38276'].steps[0].condition = null;
          // Re-activate the topic, if you wish
          player.activateTopic('38276');
        }).catch(err => {
          console.error(err);
        });
    }

    componentWillReceiveProps(nextProps) {
        updateInlineManualPlayer(nextProps.loggedUser);
    }

    render() {
        return <div>InlineManual</div>;
    }
}

export default App;
