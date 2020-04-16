import React from 'react'
import './Button.css'

function Button(props) {
    return (
        <button onClick={props.click} id='button' className={props.name}>{props.content}</button>
    )
}

export default Button