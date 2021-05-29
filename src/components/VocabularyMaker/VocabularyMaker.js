import React, {useEffect, useState, useMemo} from "react";
import "./VocabularyMaker.css" ;
import { FormInput } from "../FormInput/FormInput";
import { Table } from "../Table/Table";

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

    },[props.languages]);

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();

            let enteredLastVocabObj = {};
            let enteredLanguagesObj = [...sortedLanguages];

            enteredLanguagesObj.forEach((element,index) => {
                const vocabObj = {
                    [element.languageName] : element.inputValue
                } 
                enteredLastVocabObj = {...enteredLastVocabObj,...vocabObj};
            });

            const srNo = vocabWords.length + 1;
            let enteredlastVocab = {No : srNo, ...enteredLastVocabObj}
            let enteredVocabWords = [...vocabWords];
            enteredVocabWords.push(enteredlastVocab);
            setVocabWords(enteredVocabWords);
            console.log(enteredVocabWords);
            clearFormInputValues();

          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      });

    const handleDeleteRow = (selectedRow) => {

        console.log(vocabWords);
        
        const updatedVocabWords = vocabWords.filter(wordObj => {
            return wordObj.No !== selectedRow.No
        });

        console.log(updatedVocabWords);
        setVocabWords(updatedVocabWords);

    }

    const handleFormInputChange = (languageName, inputValue) => {

        let sortedLanguagesObj = [...sortedLanguages]; 

        const updatedSortedLanguagesObj = sortedLanguagesObj.map(lang => {
            if(lang.languageName === languageName) {
                lang.inputValue = inputValue; 
            }
            return lang;
        });

        setSortedLanguages(updatedSortedLanguagesObj);
    }

    const clearFormInputValues = () => {
        
        const updatedLanguagesObj = sortedLanguages.map(element => {
             element.inputValue = "";
             return element;
        });

        setSortedLanguages(updatedLanguagesObj);
    }

    return (
        <div className = "text-center">
                    <h3 className="top-header">Make Vocabulary with Translation</h3>
                    <p className="text-color-gray">Add <mark className="mark-box">(Min 5)</mark>word of your native language <strong>{props.nativeLang}</strong> and translate it into others.</p>
                    
                    <div className="form">
                        {sortedLanguages.map(language => {
                            return <FormInput key = {language.label} language = {language} value = {language.inputValue} handleInputChange ={(languageName, inputValue) => handleFormInputChange(languageName, inputValue)} />
                        })}
                    </div>
                {(vocabWords.length > 0)? <Table data ={vocabWords} onDelete = {(value) => handleDeleteRow(value)}/>
                    : <p className="text-color-gray">Fill All Fields At Above And Press <mark className="mark-box">ENTER</mark>Key</p>}
                    <button className="btn-start btn-start-orange" disabled={vocabWords.length < 5}>START TEST</button>
        </div>
    );

}
