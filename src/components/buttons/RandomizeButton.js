import React, { Component } from 'react';
import '../LetterCard.css';


class RandomizeButton extends Component {
    render() {

        return <button className="RandomizeButton" onClick={this.props.randomize}>Shuffle!</button>;
    }
}



export default RandomizeButton;