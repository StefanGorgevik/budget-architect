import React from 'react'
import "./SelectMode.css"

function SelectMode(props) {
    return (
        <div className="select-mode-div" >
            <label htmlFor="select-mode">Select view mode</label>
            <select id="select-mode" className="select-mode" onChange={props.selectModeHandler} value={localStorage.getItem('mode')}>
                <option value="products">Products </option>
                <option value="groups">Product groups</option>
            </select>
        </div>
    )
}

export default SelectMode;