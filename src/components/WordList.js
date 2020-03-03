import React, { Component } from 'react';
import Definitions from './Definitions';
import ShowMeaning from './buttons/ShowMeaning';

import './LetterCard.css';

import Dictionary from 'oxford-dictionary';

//instantiate dictionary as singleton
const config = {
    app_id: "b52d3e18",
    app_key: "040d5c739fcb24d336b32814603df8eb",
    source_lang: "en-us"
};

const dict = new Dictionary(config);

class WordList extends Component {

    state = {
        definition: "",
        results: [],
        lexicalEntries: [],
        entries: [],
        senses: [],
        definitions: [],
        strings: [[], []],
        categories: [],
        backdrop: false
    }


    getData = (word) => {

        const props = {
            word: word,
            filter: "lexicalCategory=noun, verb, adjective, adverb, pronoun"
            // region: "us",
            // target_language: "es"
        };

        var lookup = dict.definitions(props);

        lookup.then((res) => {
            let count = [];
            let count1 = [];
            let count2 = [];
            let count3 = [];
            let count4 = [];
            let categories = [];
            let strings = [];
            for (let i = 0; i < res.results.length; i++) {
                count.push(res.results[i].lexicalEntries.length)

                for (let m = 0; m < res.results[i].lexicalEntries.length; m++) {
                    count1.push(res.results[i].lexicalEntries[m].entries.length)
                    let cn = [];
                    cn.push(1)
                    count2.push(cn);
                    categories.push(res.results[i].lexicalEntries[m].lexicalCategory.text)
                    let string1 = [];
                    for (let l = 0; l < res.results[i].lexicalEntries[m].entries[0].senses.length; l++) {
                        let cn = [];
                        cn.push(1)
                        count3.push(cn);
                        string1.push(res.results[i].lexicalEntries[m].entries[0].senses[l].definitions)
                    }
                    strings.push(string1);
                }


            }
            this.setState({ results: count, lexicalEntries: count1, entries: count2, senses: count3, strings, categories }, () => console.log(this.state));
        })
            .catch((err) => console.log(err))

        this.backdrop();
    }


    backdrop = () => {
        let backdrop = !this.state.backdrop;
        this.setState({ backdrop });
        if (!backdrop) {
            this.setState({ categories: [], strings: [] });
        }

    }

    render() {
        const words = this.props.words
            .map(word => {
                return (
                    <li className="WordList-item" key={word}>
                        {word.toLowerCase()}
                        <ShowMeaning onClick={() => this.getData(word)} />
                    </li>
                )
            });

        return (
            <div className="WordList">
                <h3>Words You've Made! </h3>
                <ul >
                    {words}
                </ul>
                <div className={this.state.backdrop ? "backdrop" : "no-backdrop"}>
                    <Definitions categories={this.state.categories} strings={this.state.strings} onClick={this.backdrop} />
                </div>
            </div>
        )

    }
}



export default WordList;