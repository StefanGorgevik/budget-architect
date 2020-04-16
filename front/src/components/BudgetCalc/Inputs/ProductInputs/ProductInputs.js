import React from 'react'
import './ProductInputs.css'
import { connect } from 'react-redux'
import TextInput from '../TextInput/TextInput'
import DateInput from '../DateInput/DateInput'
import NumberInput from '../NumberInput/NumberInput'
import Button from '../../Button/Button'

function Inputs(props) {
    return (
        <form onSubmit={props.saveProduct}
            className="budget-calc-inputs">
            <div className="bcalc-bigger-inputs">
                <TextInput saveValue={props.handleInputValue}
                    label="name"
                    id="name"
                    placeholder="product name"
                    value={props.product.name}
                />
                <DateInput saveValue={props.handleInputValue}
                    label="date"
                    id="date"
                    placeholder="product date"
                    value={props.product.date}
                />
                <TextInput saveValue={props.handleInputValue}
                    label="type"
                    id="type"
                    placeholder="product type"
                    value={props.product.type}
                />
            </div>
            <div className="bcalc-smaller-inputs">
                <NumberInput saveValue={props.handleInputValue}
                    label="price"
                    id="price"
                    placeholder="price"
                    value={props.product.price}
                />
                <NumberInput saveValue={props.handleInputValue}
                    label="quantity"
                    id="quantity"
                    placeholder="quantity"
                    value={props.product.quantity}
                />
            </div>
            <Button click={props.saveProduct}
                content={props.editClicked ? "Save" : "Submit"}
                name='products-submit-btn' />
        </form>
    )
}

function mapStateToProps(state) {
    return {
        types: state.budgetCalcTypes
    }
}

export default connect(mapStateToProps)(Inputs);