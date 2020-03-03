import React, { Component } from 'react';
import './LetterCard.css';


class LetterCard extends Component {
    render() {

        return <a className="LetterCard" onClick={this.props.click}>{this.props.letter}</a>;
    }
}



export default LetterCard;