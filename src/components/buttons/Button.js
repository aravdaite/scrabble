import React from 'react';

const getButtonType = ({ type = '', ...rest }) => {
    const buttonDictionary = {
        enter: {
            className: rest.word ? rest.clickable ? "EnterButton-green" : "EnterButton" : "EnterButton-none",
            text: 'Enter!'
        },
        exit: {
            className: 'ExitButton',
            text: 'X'
        },
        newGame: {
            className: 'NewGame',
            text: 'New Set of Letters'
        },
        randomize: {
            className: 'RandomizeButton',
            text: 'Shuffle!'
        },
        showMeaning: {
            className: 'ShowMeaning',
            text: 'Show Meaning!'
        },
        start: {
            className: rest.started ? "StartButton-started" : "StartButton",
            text: 'Start Game!'
        },
        letterCard: {
            className: 'LetterCard',
            text: rest.letter
        },
        wordLetterCard: {
            className: rest.letter ? "WordLetterCard" : "WordLetterCard-empty",
            text: rest.letter
        }
    }
    return buttonDictionary[type] || {}
}

export const Button = ({ onClick, ...props }) => (
    <button className={getButtonType(props).className}
        onClick={onClick}>{getButtonType(props).text}</button>
);
