import React from 'react';


export const LangauageSelector = (props) => {

    return (
        <li className="lang-list-li" onClick = {props.handleLangSelection}><a className={"lang-list-li-a " + (props.isActive ? "lang-list-li-a-selected" : "")}><span>✔</span>{props.languageName}</a></li>
    )

}