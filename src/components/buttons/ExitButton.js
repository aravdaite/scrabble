import React, { Component } from 'react';
import '../LetterCard.css';


class ExitButton extends Component {



    render() {

        return <button className="ExitButton" onClick={this.props.onClick}>X</button>;
    }
}



export default ExitButton;