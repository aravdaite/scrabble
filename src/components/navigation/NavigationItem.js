import React from 'react';


const navigationItem = (props) => (

    <a href={props.link} className="navigation-link" >{props.word}</a>
);

export default navigationItem;