import React, { useState } from 'react';
import './LangauageSelectionContainer.css';
import { LangauageSelector } from './LangauageSelector';

export const LangauageSelectionContainer = () => {

    const languages = [{ label: 'eng', languageName: 'English', isActive: false},
    { label: 'hin', languageName: 'Hindi', isActive: false},
    { label: 'mar', languageName: 'Marathi', isActive: false}]

    const [selectedLanguages, setSelectedLanguages] = useState(languages);

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

        setSelectedLanguages(languages);
        console.log(languages);

    }   

    return <div className="main-container">
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
                        <li className="lang-list-li">
                            <a className="add-new-lang lang-list-li-a">
                                <label>+</label>
                                     Add Langauage
                            </a>
                        </li>

                    </ul>

                    <button className="btn btn-orange" name='make-list-button'>Let's make list of vocabulary</button>
                </div>
            </div>
        </div>
    </div>

}