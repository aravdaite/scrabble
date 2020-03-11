import React, { Component } from 'react';
import { Button, Definitions } from '../components'
import { getWordData } from '../containers/Scrabble'

export class WordList extends Component {
    state = {
        definitions: [],
        modalOpened: false
    }

    openModal = () => this.setState({ modalOpened: true })
    closeModal = () => this.setState({ modalOpened: false })

    getWordDesc = (word) => {
        getWordData(word).then(list => this.setState({ definitions: list }))

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
        const { modalOpened, definitions } = this.state
        const wordsList = words
            .map(word => (
                <li className="WordList-item" key={word}>
                    {word.toLowerCase()}
                    <Button type="showMeaning" onClick={() => this.showWordDescription(word)} />
                </li>
            )
            )

        return (
            <div className="WordList">
                <h3>Words You've Made! </h3>
                <ul>
                    {wordsList}
                </ul>
                <div className={modalOpened ? "backdrop" : "no-backdrop"}>
                    <Definitions definitions={definitions}
                        onClick={this.clearModal} />
                </div>
            </div>
        )

    }
}