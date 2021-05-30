import React from 'react'
import './StepProgressBar.css';
import "react-step-progress-bar/styles.css";
import {ProgressBar,Step} from 'react-step-progress-bar';

export const StepProgressBar = (props) => {
 
  let transformedSteps = [];
  
  const getSteps = () => {
    console.log(props.stepLength);
    for(let i = 0; i<=props.stepLength; i++) {
      
      transformedSteps.push(<Step key = {i} transition="scale">
      {({ accomplished }) => (
        <img
          style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
          width="30"
          src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
        />
      )}
    </Step>);
    }

    return transformedSteps;
  }
  return (
    <div className = "progress-wrapper">
      <ProgressBar
        percent={props.progress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        {getSteps()}
        
      </ProgressBar>

    </div>
  );
}
