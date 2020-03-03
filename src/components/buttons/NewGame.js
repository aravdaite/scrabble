import React, { Component } from 'react';
import '../LetterCard.css';


class NewGame extends Component {



    render() {

        return <button className="NewGame" onClick={this.props.onClick}>New Set of Letters</button>;
    }
}



export default NewGame;