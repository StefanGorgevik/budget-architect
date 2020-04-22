import React from 'react'
import './SelectSort.css'

function SelectSort(props) {
    var mode = props.mode
    console.log(mode)
    var sorts;
    if (mode === 'groups') {
        sorts = ["date", 'totalPrice']
    } else {
        sorts =  ["name", "type", "price", "quantity", "date"]
    }

    return (
        <div className="select-sort-div" >
            <select id="sort" className="type-select" onChange={props.selectSort}>
            <option value="default" >Select sort {mode === 'products' ? 'ascending' : 'descending'}</option>
                {sorts.map((sort, index) => {
                    return <option key={`sort${index}`} value={sort}>{sort }</option>
                })}
            </select>
        </div>
    )
}


export default SelectSort;