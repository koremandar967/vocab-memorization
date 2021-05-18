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

       const newLanguagesObj = languagesObj.map(langObj => {
            return {...langObj, inputValue : ""}
        })

        setSortedLanguages(newLanguagesObj);
        console.log(newLanguagesObj);
    },[props.languages]);

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();

            let enteredLastVocabObj = {};

            sortedLanguages.forEach((element,index) => {
                const vocabObj = {
                    [element.languageName] : element.inputValue
                } 
                enteredLastVocabObj = {...enteredLastVocabObj,...vocabObj};
            });

            const srNo = vocabWords.length + 1;
            let enteredlastVocab = {srNo : srNo, ...enteredLastVocabObj}
            let enteredVocabWords = [...vocabWords];
            enteredVocabWords.push(enteredlastVocab);
            setVocabWords(enteredVocabWords);
            console.log(enteredVocabWords);
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [vocabWords]);

    const handleFormInputChange = (languageName, inputValue) => {

        let sortedLanguagesObj = [...sortedLanguages]; 

        const updatedSortedLanguagesObj = sortedLanguagesObj.map(lang => {
            if(lang.languageName === languageName) {
                lang.inputValue = inputValue; 
            }
            return lang;
        });

        setSortedLanguages(updatedSortedLanguagesObj);
        console.log({updatedSortedLanguagesObj});

    }

    return (
        <div className = "text-center">
                    <h3 className="top-header">Make Vocabulary with Translation</h3>
                    <p className="text-color-gray">Add <mark className="mark-box">(Min 5)</mark>word of your native language <strong>{props.nativeLang}</strong> and translate it into others.</p>
                    
                    <div className="form">
                        {sortedLanguages.map(language => {
                            return <FormInput key = {language.label} language = {language} value = {language.value} handleInputChange ={(languageName, inputValue) => handleFormInputChange(languageName, inputValue)} />
                        })}
                    </div>

        </div>
    );

}
