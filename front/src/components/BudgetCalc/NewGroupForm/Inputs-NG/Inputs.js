import React from 'react'
import './Inputs.css'
import Button from '../../Button/Button'
import { connect } from 'react-redux'
import TextInput from '../../Inputs/TextInput/TextInput'
import DateInput from '../../Inputs/DateInput/DateInput'
import NumberInput from '../../Inputs/NumberInput/NumberInput'

function Inputs(props) {
    return (
        <form className="ng-form" onSubmit={props.addProductToGroup}>
            <div className="ng-date-div">
                <DateInput saveValue={props.handleGroupDateInputValue}
                    id="date" label='date' value={props.dateValue} />
                <div className="store-input-div">
                    <TextInput saveValue={props.handleProductInputValue} id="store"
                        label='store(optional)' placeholder="Store"
                        value={props.product.store} extra='store' />
                </div>
            </div>
            <TextInput saveValue={props.handleProductInputValue} id="name"
                label='name' placeholder="Product name"
                value={props.product.name} />
            <NumberInput saveValue={props.handleProductInputValue}
                id="price" label='price' placeholder="price"
                value={props.product.price} />
            <NumberInput saveValue={props.handleProductInputValue}
                id="quantity" label='quantity' placeholder="quantity"
                value={props.product.quantity} />
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