import React from 'react'
import './Select.css'
import Label from '../Label/Label'

function Select(props) {
    var date = new Date()
    var mon = date.getMonth()
    console.log(mon + 1)
    return (
        <div className="select-div">
            <Label id={props.labal} label={props.label} />
            <select name="select" className="select" onChange={props.selectOption} defaultValue={props.defaultChecked}>
                {props.options.map((option, i) => {
                    console.log(option == props.defaultChecked)
                    return <option className="option" key={`option${i}`}
                        value={i + 1}>{option}</option>
                })}
            </select>
        </div>

    )
}

export default Select
