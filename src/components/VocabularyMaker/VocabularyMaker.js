import React, {useEffect, useState} from "react";
import "./VocabularyMaker.css" ;
import { FormInput } from "../FormInput/FormInput";

export const VocabularyMaker = (props) => {

    const[sortedLanguages, setSortedLanguages] = useState(props.languages);
    const [vocabWords,setVocabWords] = useState([]);

    useEffect(() => {
        let languagesObj = [...props.languages];

        languagesObj.sort((a,b) => (
            b.isNative - a.isNative
        ));
        setSortedLanguages(languagesObj);
        console.log(languagesObj);
    },[]);

    const handleFormInputChange = (languageName, inputValue) => {

        let enteredVocabWords = [...vocabWords];

        const vocabObj = {
            [languageName] : inputValue
        } 


    }

    return (
        <div className = "text-center">
                    <h3 className="top-header">Make Vocabulary with Translation</h3>
                    <p className="text-color-gray">Add <mark className="mark-box">(Min 5)</mark>word of your native language <strong>{props.nativeLang}</strong> and translate it into others.</p>
                    
                    <div className="form">
                        {sortedLanguages.map(language => {
                            return <FormInput key = {language.label} language = {language}/>
                        })}
                    </div>

        </div>
    );

}
