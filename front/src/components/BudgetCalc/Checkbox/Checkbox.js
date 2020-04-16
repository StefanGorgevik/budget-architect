import React from 'react'
import './Checkbox.css'

function Checkbox(props) {
        return (          
                <input value={props.value}
                    onChange={props.handleCheckboxChange}
                    className="checkbox" type="checkbox" checked={props.checked} />
        )
}

export default Checkbox;