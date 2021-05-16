import { computeHeadingLevel } from '@testing-library/dom';
import React, { useState } from 'react';
import './LangauageSelectionContainer.css';
import { LangauageSelector } from '../LangauageSelector/LangauageSelector';
import { Popup } from "../Popup/Popup";
import { VocabularyMaker } from "../VocabularyMaker/VocabularyMaker";

export const LangauageSelectionContainer = () => {

    const languages = [{ label: 'eng', languageName: 'English', isNative: false},
    { label: 'hin', languageName: 'Hindi', isNative: false},
    { label: 'mar', languageName: 'Marathi', isNative: false}]

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isVocabMakerOpen, setVocabMakerOpen] = useState(false);
    const [isMakeListDisabled, setMakeListDisabled] = useState(true);
    const [isAddLanguageActive, setAddLanguageActive] = useState(true);
    const [nativeLanguage,setNativeLanguage] = useState(""); 
 
    const handleLangSelectionChange = (selectedLanguage) => {
        console.log(selectedLanguage);
        let languages = [...selectedLanguages];

        for(let index in languages) {
            if(languages[index].languageName === selectedLanguage) {
                languages[index].isNative = true;
                setNativeLanguage(selectedLanguage);
            } else {
                languages[index].isNative = false;
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
               if(element.isNative){
                   setMakeListDisabled(false);
               } 
           }); 
        }
    }

    const addLanguage = (langaugeInput) => {
        const languageObj = {label : langaugeInput.slice(0,2).toLowerCase(),
                       languageName: langaugeInput,
                       isNative: false }

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

    const handleVocabMaker = () => {
        setVocabMakerOpen(true);
    }



    return isOpen ? <Popup handleClosePopup = {handlePopup} handleAddLangauge = {addLanguage}/> : <div className="main-container">
        <div className="container">
            <div className="wrap-box">
                {isVocabMakerOpen ? <VocabularyMaker nativeLang = {nativeLanguage.toUpperCase()} languages = {selectedLanguages}/> : <div className="text-center">
                    <h3 className="top-header">Add & Select Langauage</h3>
                    <p className="text-color-gray">Add langauages which you know <mark className="mark-box">(Min 2)</mark> and <mark className="mark-box">(Max 4)</mark> and select which is your native.</p>

                    <ul className="lang-list">
                        {selectedLanguages.map(language => {
                            return <LangauageSelector key={language.label} 
                                     handleLangSelection = {() => handleLangSelectionChange(language.languageName)} 
                                     languageName= {language.languageName} 
                                     isActive = {language.isNative} />
                        })}
                        {isAddLanguageActive && <li className="lang-list-li" onClick = {handlePopup}>
                            <a className="add-new-lang lang-list-li-a">
                                <label>+</label>
                                     Add Langauage
                            </a>
                        </li>}
                    </ul>

                    <button className="btn btn-orange" disabled={isMakeListDisabled} name='make-list-button'
                    onClick = {handleVocabMaker}>Let's make list of vocabulary</button>
                </div>}            
            </div>
        </div>
    </div>

}