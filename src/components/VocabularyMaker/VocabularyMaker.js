import React, {useEffect, useState} from "react";
import "./VocabularyMaker.css" ;
import { FormInput } from "../FormInput/FormInput";

export const VocabularyMaker = (props) => {

    const[sortedLanguages, setSortedLanguages] = useState(props.languages);
    const [vocabWords,setVocabWords] = useState([]);
    const [lastVocabWord, setLastVocabWord] = useState({});

    useEffect(() => {
        let languagesObj = [...props.languages];

        languagesObj.sort((a,b) => (
            b.isNative - a.isNative
        ));
        setSortedLanguages(languagesObj);
        console.log(languagesObj);
    },[]);

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();

            const srNo = vocabWords.length + 1;
            let enteredlastVocab = {srNo : srNo, ...lastVocabWord}
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
      }, [lastVocabWord,vocabWords]);

    const handleFormInputChange = (languageName, inputValue) => {


        let enteredLastVocabWord = {...lastVocabWord};

        const vocabObj = {
            [languageName] : inputValue
        } 

        enteredLastVocabWord = {...enteredLastVocabWord,...vocabObj};
        setLastVocabWord(enteredLastVocabWord);
        console.log(enteredLastVocabWord);

    }

    return (
        <div className = "text-center">
                    <h3 className="top-header">Make Vocabulary with Translation</h3>
                    <p className="text-color-gray">Add <mark className="mark-box">(Min 5)</mark>word of your native language <strong>{props.nativeLang}</strong> and translate it into others.</p>
                    
                    <div className="form">
                        {sortedLanguages.map(language => {
                            return <FormInput key = {language.label} language = {language} handleInputChange ={(languageName, inputValue) => handleFormInputChange(languageName, inputValue)} />
                        })}
                    </div>

        </div>
    );

}
