import React from 'react'
import './SelectSort.css'
import { connect } from 'react-redux'

function SelectSort(props) {
    var sorts;
    if (props.mode === 'groups') {
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

function mapStateToProps(state) {
    return {
        mode: state.groupsReducer.mode
    }
}

export default connect(mapStateToProps)(SelectSort);