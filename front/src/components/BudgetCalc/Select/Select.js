import React from 'react'
import './Select.css'

function Select(props) {
    return (
        <div className="select-div">
            <select name="select" className="select" onChange={props.selectOption} value={props.selectedMonth}>
            {props.label === 'month' ? 
                        <option className="option" value='default' defaultChecked >All items</option>: null}
                {props.options.map((option, i) => {
                    return <option className="option" key={`option${i}`}
                        value={i}>{option}</option>
                })}
            </select>
        </div>

    )
}

export default Select
