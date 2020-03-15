import React from 'react';
import { Button } from '../components'

//TODO remove ul styles
export const Definitions = ({ definitions = [], categories = [], onClick }) => (
    <div className="Definitions">
        <Button type="exit" onClick={onClick} />
        <ul className="Definitions__ul1"><strong className="Definitions__strong">Definitions:</strong>
            {definitions.map((def, index) => (
                <li key={def}>
                    <strong className="Definitions__strong"> {categories[index]}</strong>
                    <ul className="Definitions__ul2">
                        {def.map(de => (

                            <li key={de}>{de}</li>
                        ))}
                    </ul>

                </li>
            ))}
        </ul>
    </div>
)

