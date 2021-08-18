import React from 'react';
import './style.css';

const Options = (props) => {
    const {options, selectedAnswer, optionSelected} = props;
    const listItems = options.map((option, key) => (
        <li key={key} className="optionItems">
            <input
                type="radio"
                name={option.val}
                id={`radio${ key }`} 
                value={option.val}
                onChange={selectedAnswer}
                checked={option.val === optionSelected}
            />
            <label htmlFor= {`radio${ key }`}>
                {option.val}
            </label>
        </li>
    ));
    const optionItems = <ul className="optionList">{listItems}</ul>;
    return optionItems;
};

export default Options;