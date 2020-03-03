import React, { Component } from 'react';
import './LetterCard.css';


class WordLetterCard extends Component {
    render() {

        return <a className={this.props.letter ? "WordLetterCard" : "WordLetterCard-empty"} onClick={this.props.click} >{this.props.letter}</a>;
    }
}



export default WordLetterCard;