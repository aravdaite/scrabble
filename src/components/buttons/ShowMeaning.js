import React, { Component } from 'react';
import '../LetterCard.css';


class ShowMeaning extends Component {
    render() {

        return <button className="ShowMeaning" onClick={this.props.onClick}>Show Meaning!</button>;
    }
}



export default ShowMeaning;