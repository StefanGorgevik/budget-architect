import React from 'react'
import './Label.css'

function Label(props) {
    return (
        <label className="input-label"
         htmlFor={props.id}>{props.label}</label>
    )
}

export default Label
