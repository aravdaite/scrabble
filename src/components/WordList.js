import React, { Component } from 'react';
import { Button, Definitions } from '../components'
import { getWordData } from '../containers/Scrabble'

export class WordList extends Component {
    state = {
        categories: [],
        definitions: [],
        modalOpened: false
    }

    checkKeyEsc = (e) => {
        if (e.keyCode === 27) {
            this.setState({ modalOpened: false })
        }
    }

    openModal = () => {
        this.setState({ modalOpened: true })
        document.onkeydown = this.checkKeyEsc;
    }
    closeModal = () => this.setState({ modalOpened: false })

    getWordDesc = (word) => {
        const categories = [];
        const definitions = [];

        getWordData(word).then(response => {
            response.forEach(res => {
                categories.push(res.fl)
                definitions.push(res.shortdef)
            })
            this.setState({ categories, definitions }, console.log(categories, definitions))
        })
    }

    showWordDescription = (word) => {
        this.openModal()
        this.getWordDesc(word)
    }
    clearModal = () => {
        this.closeModal()
        this.setState({ definitions: [] })
    }

    render() {
        const { words } = this.props
        const { modalOpened, definitions, categories } = this.state
        const wordsList = words
            .map(word => (
                <li className="WordList-item" key={word}>
                    {word.toLowerCase()}
                    <Button type="showMeaning" onClick={() => this.showWordDescription(word)} />
                </li>
            )
            )

        return (
            <div className="WordList" >
                <h3>Words You've Made! </h3>
                <ul>
                    {wordsList}
                </ul>
                <div className={modalOpened ? "backdrop" : "no-backdrop"}>
                    <Definitions definitions={definitions} categories={categories}
                        onClick={this.clearModal} />
                </div>
            </div>
        )

    }
}