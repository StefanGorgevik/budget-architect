import React from 'react'
import '../inputs.css'
import './TextInput.css'
import Label from '../../Label/Label'

function TextInput(props) {
    return (
        <div className="text-input-div">
            <Label id={props.id} label={props.label} />
            <input type='text'
                onChange={props.saveValue}
                className={ props.extra === 'store' ? 'store-div inputs' : "inputs"}
                id={props.id}
                placeholder={props.placeholder}
                value={props.value} />
        </div>
    )
}

export default TextInput