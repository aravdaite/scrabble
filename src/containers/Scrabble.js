import React, { Component } from 'react';
import LetterCard from '../components/LetterCard';
import WordLetterCard from '../components/WordLetterCard';
import StartButton from '../components/buttons/StartButton';
import RandomizeButton from '../components/buttons/RandomizeButton';
import NewGame from '../components/buttons/NewGame';
import EnterButton from '../components/buttons/EnterButton';
import WordList from '../components/WordList';
import Dictionary from 'oxford-dictionary';

//instantiate dictionary as singleton
const config = {
    app_id: "b52d3e18",
    app_key: "040d5c739fcb24d336b32814603df8eb",
    source_lang: "en-us"
};

const dict = new Dictionary(config);

class Scrabble extends Component {

    state = {
        letters: [], //mixed letters
        word: [], //word amde from letters
        isWord: true, //set of letters in word is an actual word
        letterPosition: [], //from which position the letter was added to form a word, so it can be returned to the same position
        wordList: [ "hut", "pen", "trick"], //array of all made words
        started: false
    }

    newGame = () => {

        const wordList = [...this.state.wordList];
        this.setState({
            letters: [],
            word: [],
            isWord: true,
            letterPosition: [],
            wordList,
            started: true
        })

        this.getLetters();
    }
    fillLetters = () => {

        const vowels = 'AEIOUY';
        const consonants = 'BCDFGHJKLMNPQRSTVWXZ';
        let letters = [...this.state.letters];
        let vowelsNum = 0;
        let emptyNum = 0;
        let randomVowelNum;

        for (let i = 0; i < letters.length; i++) {
            if (letters[i] === "A" || letters[i] === "E" || letters[i] === "I" || letters[i] === "O" || letters[i] === "U" || letters[i] === "Y") {
                vowelsNum++;
            } else if (letters[i] === "") {
                emptyNum++;
            }
        }

        Math.random() < 0.5 ? randomVowelNum = 3 : randomVowelNum = 2;

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

        this.setState({ letters: letters });
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

        let word = array;
        word = word.join('');

        const props = {
            word: word,
            filter: "lexicalCategory=noun, verb, adjective, adverb, pronoun"
            // region: "us",
            // target_language: "es"
        };
        if (word !== "") {
            const lookup = dict.find(props);

            lookup.then((res) => this.setState({ isWord: true }, () => console.log(this.state.isWord, res)))
                .catch((err) => this.setState({ isWord: false }, () => console.log(this.state.isWord, err)))

        }
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

    removeLetterToWord = (index) => {

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

        const vowels = 'AEIOUY';
        const consonants = 'BCDFGHJKLMNPQRSTVWXZ';
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
                    <StartButton started={this.state.started} start={this.getLetters} />
                    <div className={this.state.started ? "main_box-started" : "main_box"}>
                        <p className="text-create"> Create a word!</p>
                        <div className="WordBox">
                            <WordLetterCard letter={this.state.word[0]} click={() => this.removeLetterToWord(0)} />
                            <WordLetterCard letter={this.state.word[1]} click={() => this.removeLetterToWord(1)} />
                            <WordLetterCard letter={this.state.word[2]} click={() => this.removeLetterToWord(2)} />
                            <WordLetterCard letter={this.state.word[3]} click={() => this.removeLetterToWord(3)} />
                            <WordLetterCard letter={this.state.word[4]} click={() => this.removeLetterToWord(4)} />
                            <WordLetterCard letter={this.state.word[5]} click={() => this.removeLetterToWord(5)} />
                            <WordLetterCard letter={this.state.word[6]} click={() => this.removeLetterToWord(6)} />
                            <EnterButton enter={this.enterWord} word={this.state.word[0]} clickable={this.state.isWord} />
                        </div>
                        <div className="LetterBox">
                            <LetterCard letter={this.state.letters[0]} click={() => this.putLetterToWord(0)} />
                            <LetterCard letter={this.state.letters[1]} click={() => this.putLetterToWord(1)} />
                            <LetterCard letter={this.state.letters[2]} click={() => this.putLetterToWord(2)} />
                            <LetterCard letter={this.state.letters[3]} click={() => this.putLetterToWord(3)} />
                            <LetterCard letter={this.state.letters[4]} click={() => this.putLetterToWord(4)} />
                            <LetterCard letter={this.state.letters[5]} click={() => this.putLetterToWord(5)} />
                            <LetterCard letter={this.state.letters[6]} click={() => this.putLetterToWord(6)} />
                            <RandomizeButton randomize={this.shuffleLetters} />
                        </div>
                        <NewGame onClick={this.newGame} />
                    </div>
                </div>
            </div>
        );
    };
}
export default Scrabble;