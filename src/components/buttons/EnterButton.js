import React, { Component } from 'react';
import '../LetterCard.css';


class EnterButton extends Component {
    render() {

        return <button className={this.props.word ? this.props.clickable ? "EnterButton-green" : "EnterButton" : "EnterButton-none"} onClick={this.props.enter}>Enter!</button>;
    }
}



export default EnterButton;