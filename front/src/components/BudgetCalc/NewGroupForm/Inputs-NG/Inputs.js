import React from 'react'
import './Inputs.css'
import Button from '../../Button/Button'
import TextInput from '../../Inputs/TextInput/TextInput'
import NumberInput from '../../Inputs/NumberInput/NumberInput'

function Inputs(props) {
    return (
        <form className="ng-form" onSubmit={props.addProductToGroup}>
                <div className='ng-inputs'>
                    <TextInput saveValue={props.handleProductInputValue} id="name"
                        label='name' placeholder="Product name"
                        value={props.product.name} />
                    <NumberInput saveValue={props.handleProductInputValue}
                        id="price" label='price' placeholder="price"
                        value={props.product.price} />
                    <NumberInput saveValue={props.handleProductInputValue}
                        id="quantity" label='quantity' placeholder="quantity"
                        value={props.product.quantity} />
                </div>
                <div className="ng-btn-div">
                <Button click={props.addProductToGroup}
                    content='Add product to group'
                    name="ng-btn"
                />
                </div>
        </form> 
    )
}

export default Inputs