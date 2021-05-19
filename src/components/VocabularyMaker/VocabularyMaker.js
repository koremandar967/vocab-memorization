import React, {useEffect, useState, useMemo} from "react";
import "./VocabularyMaker.css" ;
import { FormInput } from "../FormInput/FormInput";
import {VocabularyTable} from '../VocabularyTable/VocabularyTable'

export const VocabularyMaker = (props) => {

    const[sortedLanguages, setSortedLanguages] = useState(props.languages);
    const [vocabWords,setVocabWords] = useState([]);
    const [columns,setColumns] = useState();

    useEffect(() => {
        let languagesObj = [...props.languages];

        languagesObj.sort((a,b) => (
            b.isNative - a.isNative
        ));

        setSortedLanguages(languagesObj);
        console.log(languagesObj);
        const transformedColumns = transformTableColumns();
        setColumns(transformedColumns);

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
      }, [vocabWords,sortedLanguages]);

      const transformTableColumns = () => {

        let languages = [...props.languages];
        let transformedVocabObj = {};

        languages.forEach((element,index) => {
            const vocabObj = {
                [element.languageName] : element.inputValue
            } 
            transformedVocabObj = {...transformedVocabObj,...vocabObj};
        });

        const enteredlastVocab = {No : 0, ...transformedVocabObj}

        const columns = Object.keys(enteredlastVocab).map((key, id)=>{
            return {
              Header: key,
              accessor: key
            }
          });

          return columns;

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
                {Boolean(columns)&&<VocabularyTable columns = {columns} data = {vocabWords}></VocabularyTable>}
        </div>
    );

}
