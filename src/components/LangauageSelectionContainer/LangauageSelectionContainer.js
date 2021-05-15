import { computeHeadingLevel } from '@testing-library/dom';
import React, { useState } from 'react';
import './LangauageSelectionContainer.css';
import { LangauageSelector } from '../LangauageSelector/LangauageSelector';
import { Popup } from "../Popup/Popup";

export const LangauageSelectionContainer = () => {

    const languages = [{ label: 'eng', languageName: 'English', isActive: false},
    { label: 'hin', languageName: 'Hindi', isActive: false},
    { label: 'mar', languageName: 'Marathi', isActive: false}]

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isMakeListDisabled, setMakeListDisabled] = useState(true);
    const [isAddLanguageActive, setAddLanguageActive] = useState(true);


    const handleLangSelectionChange = (selectedLanguage) => {
        console.log(selectedLanguage);
        let languages = [...selectedLanguages];

        for(let index in languages) {
            if(languages[index].languageName === selectedLanguage) {
                languages[index].isActive = true;
            } else {
                languages[index].isActive = false;
            }
        }

        validateMakeListButton(languages);

        setSelectedLanguages(languages);
        console.log(languages);

    }   

    const handlePopup = () => {
        setOpen(!isOpen);
    }

    const validateMakeListButton = (languages) => {

        if(languages.length >= 2) {
           languages.forEach(element => {
               if(element.isActive){
                   setMakeListDisabled(false);
               } 
           }); 
        }
    }

    const addLanguage = (langaugeInput) => {
        const languageObj = {label : langaugeInput.slice(0,2).toLowerCase(),
                       languageName: langaugeInput,
                        isActive: false }

        let languages = [...selectedLanguages];

        languages.push(languageObj);

        if(languages.length >= 4) {
            setAddLanguageActive(false);
        }

        validateMakeListButton(languages);

        setSelectedLanguages(languages);
        console.log(languages);
        handlePopup();
    }



    return isOpen ? <Popup handleClosePopup = {handlePopup} handleAddLangauge = {addLanguage}/> : <div className="main-container">
        <div className="container">
            <div className="wrap-box">
                <div className="text-center">
                    <h3 className="top-header">Add & Select Langauage</h3>
                    <p className="text-color-gray">Add langauages which you know <mark className="mark-box">(Min 2)</mark> and <mark className="mark-box">(Max 4)</mark> and select which is your native.</p>

                    <ul className="lang-list">
                        {selectedLanguages.map(language => {
                            return <LangauageSelector key={language.label} 
                                     handleLangSelection = {() => handleLangSelectionChange(language.languageName)} 
                                     languageName= {language.languageName} 
                                     isActive = {language.isActive} />
                        })}
                        {isAddLanguageActive && <li className="lang-list-li" onClick = {handlePopup}>
                            <a className="add-new-lang lang-list-li-a">
                                <label>+</label>
                                     Add Langauage
                            </a>
                        </li>}
                    </ul>

                    <button className="btn btn-orange" disabled={isMakeListDisabled} name='make-list-button'>Let's make list of vocabulary</button>
                </div>
            </div>
        </div>
    </div>

}