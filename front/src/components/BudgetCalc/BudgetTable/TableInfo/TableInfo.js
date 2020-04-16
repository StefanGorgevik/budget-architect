import React from 'react'
import './TableInfo.css'

function TableInfo(props) {
    return (
        <div className="table-info-div">
            <p className="price-p">Total price: <span>{props.totalPrice}</span></p>
            <p className="price-p">Number of products: <span>{props.productsLength}</span></p>
           
        </div>
    )
}

export default TableInfo