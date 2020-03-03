import React, { Component } from 'react';
import '../LetterCard.css';


class StartButton extends Component {



    render() {

        return <button className={this.props.started ? "StartButton-started" : "StartButton"} onClick={this.props.start}>Start Game!</button>;
    }
}



export default StartButton;