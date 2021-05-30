import React, {useState,useEffect} from 'react'
import './QuizContainer.css';
import {StepProgressBar} from '../StepProgressBar/StepProgressBar'

export  const QuizContainer = (props) => {

    const [questionNumber, setQuestionNumber] = useState(1);
    const [nativeLanguage, setNativeLanguage] = useState("");
    const [otherLanguages, setOtherLanguages] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const [stepProgress, setStepProgress] = useState(0);

    useEffect(() => {
        setAllLanguages();
        loadQuestion(questionNumber);
        setStepProgress(100/props.questionLength);
    }, []);

    const setAllLanguages = () => {

        const keys = getKeys();

        if(keys.length > 0) {
            const nativeLang = getNativeLanguage();
            setNativeLanguage(nativeLang);
            
            let otherLangs = [];
            for(let i = 2; i < keys.length; i++) {
                otherLangs.push(keys[i]);
            }

            setOtherLanguages(otherLangs);
        }

    }

    const getNativeLanguage = () => {

        let nativeLang = "";

        const keys = getKeys();
        if(keys.length > 0) {
            nativeLang = keys[1];
        }

        return nativeLang;
    }

    const loadQuestion = (queNumber) => {

        const vocabWordObj = props.vocabWords.find(wordObj => wordObj.No === queNumber);

        if(vocabWordObj) {
            const nativeLang = getNativeLanguage();
            const currentWordText = vocabWordObj[nativeLang];
            setCurrentWord(currentWordText);
            setQuestionNumber(queNumber);
            console.log(currentWordText);
        }

    }

    const getKeys = () => {
        return (props.vocabWords.length > 0) && Object.keys(props.vocabWords[0]);
      }

      const handleNextClick = () => {
          const nextQuestionNumber = questionNumber + 1;
          loadQuestion(nextQuestionNumber);
          const  currentStepProgress = stepProgress + (100/ props.questionLength);
            setStepProgress(currentStepProgress);
        }
 
    return (
        <div className = "text-center">
            <h3 className="top-header">Quiz</h3>
            <p className="text-color-gray">Give answers of <mark className="mark-box">{props.questionLength + " questions."}</mark> You have to translate native language word into others langauage</p>
            <StepProgressBar stepLength = {props.questionLength} progress = {stepProgress}/>
            <p className="quiz-question">Translate this "{currentWord}" word of your native language {nativeLanguage.toUpperCase()}, into the following languages:</p>
            <div className="btn-container">
                <button className="btn-next btn-next-orange" onClick = {handleNextClick}>Next</button>
            </div>
        </div>
    )
}

