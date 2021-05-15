import React, {useState} from "react";
import "./Popup.css";

export const Popup = (props) => {

    const [langauageInput, setLangauageInput] = useState("");
    const [isLangInputInvalid, setLangInputInvalid] = useState(false);

    const handleInputChange = (e) => {
        setLangauageInput(e.target.value);
    }

    const addLanguage = () => {

        if(langauageInput.length == 0) {
            setLangInputInvalid(true);
        } else {
            props.handleAddLangauge(langauageInput);
            setLangInputInvalid(false);
        }

    }

    return (
        <div className = "popup-box">
            <div className = "box">
                <span className = "close-icon" onClick = {props.handleClosePopup}>X</span>
                <div className = "model-body">
                    <h2 className = "text-center">Add New Language</h2>
                    <input type="text" id="lang" name="lang" placeholder = "Language Name" onChange ={handleInputChange}></input>
                    {isLangInputInvalid && <span className = "text-danger">This field is required</span>}
                    <button className="btn btn-orange" name='add-lang-button' onClick = {addLanguage}>I know this language</button>
                </div>
            </div>
        </div>
    )


}