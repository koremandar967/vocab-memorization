import react, {usetState} from 'react';

export const DeleteButton = (props) => {

    const handleClick = (e) => {
        console.log(props.values);
    }

    return (
        <button onClick = {handleClick}>Delete</button>
    );

}