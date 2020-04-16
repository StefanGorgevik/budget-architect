import React from 'react'
import './Inputs.css'
import Button from '../../Button/Button'
import { connect } from 'react-redux'

function Inputs(props) {
    return (
        <form onSubmit={props.addProductToGroup}>
            <div className="ng-date-div">
                <div>
                    <label htmlFor="date">Date</label>
                    <input onChange={props.handleGroupDateInputValue} type="date" id="date" />
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <input onChange={props.handleGroupDateInputValue} type="text" id="type" placeholder="Enter the type of your products" />
                </div>

            </div>
            <input onChange={props.handleProductInputValue}
                type="text" id="name" placeholder="Enter product name"
                value={props.product.name} />

            <div className="ng-price-quantity-div">
                <label htmlFor="price">Price:</label>
                <input type="number" id="price"
                    onChange={props.handleProductInputValue}
                    placeholder="Enter product price"
                    value={props.product.price} required />
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity"
                    onChange={props.handleProductInputValue}
                    placeholder="Enter product quantity"
                    value={props.product.quantity} />
            </div>
            <Button click={props.addProductToGroup}
                content='Add product to group'
                name="ng-btn"
            />
        </form>
    )
}

function mapStateToProps(state) {
    return {
        productToEdit: state.productToEdit
    }
}

export default connect(mapStateToProps)(Inputs)