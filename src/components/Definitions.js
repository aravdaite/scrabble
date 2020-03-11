import React from 'react';
import { Button } from '../components'

//TODO remove ul styles
export const Definitions = ({ definitions = [], onClick }) => (
    <div className="Definitions">
        <Button type="exit" onClick={onClick} />
        <ul>
            {definitions.map((definitionObj, index) => (
                <li key={definitionObj.definition}>
                    {`${index + 1}. `} {definitionObj.definition}
                </li>
            ))}
        </ul>
    </div>
)

