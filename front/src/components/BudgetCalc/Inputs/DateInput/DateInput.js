import React from 'react'
import './DateInput.css'
import '../inputs.css'
import Label from '../../Label/Label'

function DateInput(props) {
    return (
        <div>
            <Label id={props.id} label={props.label} />
            <input
                onChange={props.saveValue}
                className="inputs"
                type='date'
                id={props.id}
                value={props.value.toString().slice(0, 10)}
            />
        </div>
    )
}

export default DateInput
