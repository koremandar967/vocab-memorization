import React, {useState  } from "react";
import "./FormInput.css";

export const FormInput = (props) => {

    let languageName = props.language.languageName;
        
    if(props.language.isNative) {
        languageName += " (Native)" 
    }

    return (

        <div className = "form-group">
            <span className="form-label">{languageName}</span>
            <input type="text" className = "form-input" id={props.language.label} name="lang"></input>
        </div>
    );


}