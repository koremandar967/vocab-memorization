import React from 'react';
import './DeleteButton.css';

export const DeleteButton = (props) => {

    return (
        <button className="btn delete-btn" onClick = {props.deleteRow}>✕</button>
    );

}