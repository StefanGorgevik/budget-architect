import React from 'react'
import './Alert.css'

function Alert(props) {
    return (
        <main className="err-alert-main">
            <div className="err-alert-div">
                <h1>Error</h1>
                <p>{props.text} bbbb</p>
                <button onClick={props.click} className="close-err-alert-button">Ok</button>
            </div>
        </main>
    )
}

export default Alert