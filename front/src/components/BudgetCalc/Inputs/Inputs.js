import React from 'react'
import './Inputs.css'
import { connect } from 'react-redux'

function Inputs(props) {
    return (
        <form onSubmit={props.saveProduct}
            className="budget-calc-inputs">
            <div className="bcalc-bigger-inputs">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={props.handleInputValue}
                        type="text"
                        id="name"
                        placeholder="product name"
                        value={props.product.name}
                    />
                </div>
                <div>
                    <label htmlFor="date">date</label>
                    <input
                        onChange={props.handleInputValue}
                        type="date"
                        id="date"
                        value={props.product.date}
                    />
                </div>
                <div>
                    <label htmlFor="type">type</label>
                    <input
                        onChange={props.handleInputValue}
                        type="text"
                        id="type"
                        value={props.product.type}
                        placeholder="Type"
                    />
                </div>
            </div>

            <div className="bcalc-smaller-inputs">
                <div className="budget-calc-price-div">
                    <label htmlFor="quantity-input">Price</label>
                    <input
                        onChange={props.handleInputValue}
                        type="number"
                        id="price"
                        placeholder="price"
                        value={props.product.price}
                    />
                </div>
                <div className="budget-calc-quantity-div">
                    <label id="quantity-label" htmlFor="quantity-input">Quantity</label>
                    <input
                        onChange={props.handleInputValue}
                        type="number"
                        id="quantity"
                        placeholder="quantity"
                        value={props.product.quantity}
                    />
                </div>
            </div>
            <button onClick={props.saveProduct}
                className="budget-calc-submit-btn">  {props.editClicked ? "Save" : "Submit"}</button>
        </form>
    )
}

function mapStateToProps(state) {
    return {
        types: state.budgetCalcTypes
    }
}

export default connect(mapStateToProps)(Inputs);