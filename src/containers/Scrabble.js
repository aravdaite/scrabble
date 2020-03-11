import React, { Component } from 'react';
import { Button, WordList } from '../components';

const vowels = 'AEIOUY';
const consonants = 'BCDFGHJKLMNPQRSTVWXZ';

export const getWordData = (word) => {
    return fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
            "x-rapidapi-key": "wjZqL855a4msh34pawTk4IbaHwrwp1LcGUhjsnunhhQ0LrHrIG"
        }
    })
        .then(response => response.json())
        .then(({ list }) => list)
        .catch(err => {
            console.log(err);
        });
}

class Scrabble extends Component {

    state = {
        letters: [], //mixed letters
        word: [], //word amde from letters
        isWord: false, //set of letters in word is an actual word
        letterPosition: [], //from which position the letter was added to form a word, so it can be returned to the same position
        wordList: ["hut", "pen", "trick"], //array of all made words
        started: false
    }

    newGame = () => {

        const wordList = [...this.state.wordList];
        this.setState({
            letters: [],
            word: [],
            isWord: false,
            letterPosition: [],
            wordList,
            started: true
        })
        this.getLetters();
    }

    fillLetters = () => {

        let letters = [...this.state.letters];
        let vowelsNum = 0;
        let emptyNum = 0;
        let randomVowelNum;

        letters.forEach(letter => {
            if (letter === "A" || letter === "E" || letter === "I" || letter === "O" || letter === "U" || letter === "Y") {
                vowelsNum++;
            } else if (letter === "") {
                emptyNum++;
            }
        })

        Math.random() < 0.5 ? randomVowelNum = 3 : Math.random() < 0.5 ? randomVowelNum = 2 : randomVowelNum = 4;

        for (let m = randomVowelNum - vowelsNum; m > 0; m--) {

            for (let i = 0; i < letters.length; i++) {
                if (letters[i] === "") {
                    letters[i] = vowels.charAt(Math.floor(Math.random() * 5));
                    break;
                }
            }
            emptyNum--;
        }

        for (let j = emptyNum; j > 0; j--) {
            for (let k = 0; k < letters.length; k++) {
                if (letters[k] === "") {
                    letters[k] = consonants.charAt(Math.floor(Math.random() * 7));
                    break;
                }
            }
        }

        this.setState({ letters });
    }

    enterWord = () => {

        if (this.state.word !== '' && this.state.isWord === true) {

            const wordList = [...this.state.wordList];
            let word = [...this.state.word];
            word = word.join('');
            wordList.unshift(word);

            this.setState({ wordList, word: [], letterPosition: [], isWord: false });
            this.fillLetters();
        }
    }

    validateWord = (array) => {
        const word = array.join('');
        if (word !== "") {
            return getWordData(word).then((list = []) => this.setState({ isWord: Array.isArray(list) && list.length > 0 }))
        }
        this.setState({ isWord: false })
    }

    removeFromArray = (array, index) => {

        for (let i = 0; i < array.length - 1; i++) {
            if (i >= index) {
                array[i] = array[i + 1];
            }
        }
        array.pop();
    }

    putLetterToWord = (index) => {

        if (this.state.letters[index] !== '') {
            const word = [...this.state.word];
            const letterPosition = [...this.state.letterPosition];
            const letters = [...this.state.letters];

            word.push(this.state.letters[index]);
            letterPosition.push(index);
            letters[index] = '';

            this.setState({ word, letterPosition, letters });
            this.validateWord(word);
        }
    }

    removeLetterFromWord = (index) => {

        if (index < this.state.word.length) {

            const word = [...this.state.word];
            const letterPosition = [...this.state.letterPosition];
            const letters = [...this.state.letters];
            const letter = this.state.word[index];
            const pos = this.state.letterPosition[index];
            letters[pos] = letter;

            this.removeFromArray(word, index);
            this.removeFromArray(letterPosition, index);

            this.setState({ word, letters, letterPosition });
            this.validateWord(word);
        }
    }

    shuffleLetters = () => {

        const letters = [...this.state.letters];

        if (this.state.word.length !== 0) {

            let word = [...this.state.word];
            let letterPosition = [...this.state.letterPosition];

            for (let i = 0; i < this.state.word.length; i++) {
                const pos = this.state.letterPosition[i];
                const letter = this.state.word[i];
                letters[pos] = letter;
            }

            letterPosition = [];
            word = [];
            this.setState({ word, letterPosition });
        }
        else {
            for (let i = letters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[j]] = [letters[j], letters[i]];
            }
        }

        this.setState({ letters: letters });
    }

    getLetters = () => {
        let result = '';
        let vowelString = '';
        let consonantString = '';

        let numVowels;
        let numConsonants;

        let charactersLength = vowels.length;

        if (Math.random() > 0.5) {
            numVowels = 3;
        } else { numVowels = 2; }

        numConsonants = 7 - numVowels;

        for (let i = 0; i < numVowels; i++) {
            vowelString += vowels.charAt(Math.floor(Math.random() * charactersLength));
        }

        charactersLength = consonants.length;

        for (let i = 0; i < numConsonants; i++) {
            consonantString += consonants.charAt(Math.floor(Math.random() * charactersLength));
        }

        result = vowelString.concat(consonantString);

        //randomize the array of letters

        const stringArray = [];

        for (let i = 0; i < result.length; i++) {
            stringArray[i] = result[i];
        }

        for (let i = stringArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [stringArray[i], stringArray[j]] = [stringArray[j], stringArray[i]];
        }
        this.setState({ letters: stringArray, started: true });
    }

    render() {
        return (
            <div className="main_body">
                <WordList words={this.state.wordList} />
                <div className="game-field">
                    <Button type="start" started={this.state.started} onClick={this.getLetters} />
                    <div className={this.state.started ? "main_box-started" : "main_box"}>
                        <p className="text-create"> Create a word!</p>
                        <div className="WordBox">
                            {[...Array(7).keys()].map((index) =>
                                <Button type="wordLetterCard"
                                    letter={this.state.word[index]}
                                    onClick={() => this.removeLetterFromWord(index)} />)}
                            <Button type="enter" onClick={this.enterWord} word={this.state.word[0]} clickable={this.state.isWord} />
                        </div>
                        <div className="LetterBox">
                            {[...Array(7).keys()].map((index) =>
                                <Button type="letterCard" letter={this.state.letters[index]}
                                    onClick={() => this.putLetterToWord(index)} />)}
                            <Button type="randomize" onClick={this.shuffleLetters} />
                        </div>
                        <Button type="newGame" onClick={this.newGame} />
                    </div>
                </div>
            </div>
        );
    };
}
export default Scrabble;