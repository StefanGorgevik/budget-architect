import React from 'react'
import './EmailInput.css'
import '../inputs.css'
import Label from '../../Label/Label'


function EmailInput(props) {
    return (
        <div className="input-div">
            <Label id={props.id} label={props.label} />
            <input
                onChange={props.saveValue}
                className="inputs"
                type='email'
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default EmailInput
