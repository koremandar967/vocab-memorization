import React from 'react';
import './LangauageSelectionContainer.css';

export const LangauageSelectionContainer = () => {

    return <div className="main-container">
        <div className="container">
            <div className="wrap-box">
                <div className="text-center">
                    <h3 className="top-header">Add & Select Langauage</h3>
                    <p className="text-color-gray">Add langauages which you know <mark className="mark-box">(Min 2)</mark> and <mark className="mark-box">(Max 4)</mark> and select which is your native.</p>
                    <ul className = "lang-list">
                        <li className = "lang-list-li">Coffee</li>
                        <li className = "lang-list-li">Tea</li>
                        <li className = "lang-list-li">
                            <a className = "add-new-lang lang-list-li-a">
                                <label>+</label>
                                    Add Langauage
                                    </a>
                            </li>
                    </ul>

                </div>
            </div>
        </div>
    </div>

}