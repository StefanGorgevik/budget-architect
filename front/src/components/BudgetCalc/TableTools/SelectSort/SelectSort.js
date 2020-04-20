import React from 'react'
import './SelectSort.css'

function SelectSort(props) {
    var sorts;
    if (localStorage.getItem('mode') === 'groups') {
        sorts = ["date", 'totalPrice']
    } else {
        sorts = props.sorts
    }
    return (
        <div className="select-sort-div" >
            <select id="sort" className="type-select" onChange={props.selectFilterHandler}>
            <option value="default" >Select sort ascending</option>
                {sorts.map((sort, index) => {
                    return <option key={`sort${index}`} value={sort}>{sort }</option>
                })}
            </select>
        </div>
    )
}


export default SelectSort;