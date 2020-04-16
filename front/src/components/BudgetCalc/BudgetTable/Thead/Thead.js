import React from 'react'
import './Thead.css'

function Thead(props) {
    return (
        <div className="top-table">
                <ul>
                    <li id="name-li">Name</li>
                    <li id="type-li">Type</li>
                    <li id="price-li">Price</li>
                    <li id="quantity-li">Quantity</li>
                    <li id="date-li">Date</li>
                </ul>
        </div>
    )
}

export default Thead;