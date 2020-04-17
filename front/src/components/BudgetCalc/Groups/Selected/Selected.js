import React from 'react'
import './Selected.css'
import Table from '../../NewGroupForm/Table-NG/Table'

function Selected(props) {
    return (
        <div className="selected-group">
            <h1>Products</h1>
            <Table products={props.products}
                totalPrice={props.totalPrice}
            />
        </div>
    )
}

export default Selected;