import React from 'react'
import './PasswordInput.css'
import '../inputs.css'
import Label from '../../Label/Label'

function PasswordInput(props) {
    return (
        <div className="input-div">
            <Label id={props.id} label={props.label} />
            <input
                onChange={props.saveValue}
                className="inputs"
                type='password'
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default PasswordInput
