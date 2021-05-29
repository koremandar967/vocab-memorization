import React from 'react';
import {DeleteButton} from '../../DeleteButton/DeleteButton'

export const RenderRow = (props) => {

    let row = props.keys.map((key,index) => {
        return <td key ={props.rowData[key]}>{props.rowData[key]}</td>
    });

    row.push(<td key = {props.rowData}><DeleteButton values = {props.rowData} deleteRow = {props.handleDelete}/></td>);
    return row;
}