import React from 'react'
import "./SelectMode.css"
import {connect} from 'react-redux'

function SelectMode(props) {
    return (
        <div className="select-mode-div" >
            <label htmlFor="select-mode">Select view mode</label>
            <select id="select-mode" className="select-mode" onChange={props.selectModeHandler} value={props.mode}>
                <option value="products">Products </option>
                <option value="groups">Product groups</option>
            </select>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        mode: state.productsReducer.mode
    }
}

export default connect(mapStateToProps)(SelectMode);