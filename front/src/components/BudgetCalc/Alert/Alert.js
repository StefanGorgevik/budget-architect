import React from 'react'
import './Alert.css'
import Button from '../Button/Button'

function Alert(props) {
    return (
        <main className="err-alert-main">
            <div className="err-alert-div">
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <Button click={props.accept}
                        name="ng-btn"
                        content="OK"
                />
                {props.show ?
                <Button click={props.decline}
                        name="ng-btn"
                        content="CLOSE"
                />
                 : null}
            </div>
        </main>
    )
}

export default Alert