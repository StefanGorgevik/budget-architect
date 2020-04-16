import React from 'react'
import './NumberInput.css'
import Label from '../../Label/Label'
import '../inputs.css'

function NumberInput(props) {
    return (
        <div className='number-input-div'>
            <Label id={props.id} label={props.label} />
            <input
                onChange={props.saveValue}
                className="inputs"
                type='number'
                id={props.id}
                value={props.value}
            />
        </div>
    )
}

export default NumberInput
