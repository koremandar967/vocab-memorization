import React from 'react';
import { RenderRow } from "./RenderRow/RenderRow";
import './Table.css';

export const Table = (props) => {

  const getKeys = () => {
    return (props.data.length > 0) && Object.keys(props.data[0]);
  }

  const getHeader =() => {
      const keys = getKeys();
      let columns =  keys.map((key,index)=> {
          return <th key = {key}>{key.toUpperCase()}</th>
      });

      columns.push(<th key = {'Delete'}>{"DELETE"}</th>);
      return columns;
  }

  const getRowsData = () => {
    const keys = getKeys();
      let rows =  props.data.map((row, index) => {
        return <tr key = {index}><RenderRow rowData = {row} keys = {keys} handleDelete = {() => deleteSelectedRow(row)}/></tr>
      });
      return rows;
  }

  const deleteSelectedRow = (selectedRow) => {
    props.onDelete(selectedRow)
  }

    return(
      <div>
        <table>
          <thead>
          <tr>{getHeader()}</tr>
          </thead>
          <tbody>
          {getRowsData()}
          </tbody>
        </table>
      </div>
    );

}
