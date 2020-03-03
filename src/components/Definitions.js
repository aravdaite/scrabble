import React, { Component } from 'react';
import ExitButton from './buttons/ExitButton';
import './LetterCard.css';


class Definitions extends Component {
    render() {



        const definitions = this.props.categories
            .map((category, index) => {
                return (
                    <ul key={category}>
                        {category}
                        {this.props.strings[index]
                            .map(index => {
                                return (
                                    <li key={index}>
                                        {index}
                                    </li>)
                            })}

                    </ul>
                )
            })


        return (
            <div className="Definitions">
                <ExitButton onClick={this.props.onClick} />
                {definitions}

            </div>

        )

    }
}


export default Definitions;