import React, {useState} from "react";
import "./Popup.css";

export const Popup = (props) => {

    const [langauageInput, setLangauageInput] = useState("");

    const handleInputChange = (e) => {
        setLangauageInput(e.target.value);
    }

    return (
        <div className = "popup-box">
            <div className = "box">
                <span className = "close-icon" onClick = {props.handleClosePopup}>X</span>
                <div className = "model-body">
                    <h2 className = "text-center">Add New Language</h2>
                    <input type="text" id="lang" name="lang" placeholder = "Language Name" onChange ={handleInputChange}></input>
                    <button className="btn btn-orange" name='add-lang-button' onClick = {() => props.handleAddLangauge(langauageInput)}>I know this language</button>
                </div>
            </div>
        </div>
    )


}