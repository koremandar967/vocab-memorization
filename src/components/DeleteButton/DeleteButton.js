import react, {useEffect, usetState} from 'react';

export const DeleteButton = (props) => {

    useEffect(() => {
        console.log(props.vocabWords);
    },[props.vocabWords]);

    const handleClick = (e) => {
        console.log(props.values);
        props.onDelete(props.values);
        // let enteredVocabWords = [...props.vocabWords];
        
        // const updatedVocabWords = enteredVocabWords.filter(wordObj => {
        //     return wordObj.noValue != props.values
        // });
        // console.log(updatedVocabWords);

    }

    return (
        <button onClick = {handleClick}>Delete</button>
    );

}