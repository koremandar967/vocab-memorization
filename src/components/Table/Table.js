import React, {useState} from 'react';


export const Table = (props) => {

  const getKeys = () => {
    return Object.keys(props.data[0]);
  }

  const getHeader = () => {
      const keys = getKeys();
      return keys.map((key,index)=> {
          return <th key = {key}>{key.toUpperCase()}</th>
      });
  }

  const renderRow = (rowData) => {
    const keys = getKeys();
    return keys.map((key,index) => {
      return <td key ={rowData[key]}>{rowData[key]}</td>
    });
  }

  const getRowsData = () => {
    const keys = getKeys();
      return props.data.map((row, index) => {
        return <tr key = {index}>{renderRow(row)}</tr>
      });
  }

    return(
      <div>
        <table>
          <thead>
          <tr>{getHeader}</tr>
          </thead>
          <tbody>
          {getRowsData}
          </tbody>
        </table>
      </div>
    );

}
