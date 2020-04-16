import React from 'react'
import './TableInfo.css'

function TableInfo(props) {
    return (
        <main className="ng-info-main">
          <p>Number of products: <span>{props.productsLength}</span></p>   
          <p>Total price: <span>{props.totalPrice}</span></p>   
        </main>
    )
}

export default TableInfo 