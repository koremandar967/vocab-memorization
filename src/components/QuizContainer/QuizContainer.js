import React from 'react'
import './QuizContainer.css';
import {StepProgressBar} from '../StepProgressBar/StepProgressBar'

export  const QuizContainer = (props) => {
    return (
        <div className = "text-center">
            <h3 className="top-header">Quiz</h3>
            <p className="text-color-gray">Give answers of <mark className="mark-box">{props.questionLength + " questions."}</mark> You have to translate native language word into others langauage</p>
            <StepProgressBar stepLength = {props.questionLength}/>
        </div>
    )
}

