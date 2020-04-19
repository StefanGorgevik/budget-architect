import React from 'react'
import './Tbody.css'
import Button from '../../Button/Button'

function Tbody(props) {
    var products = []
    if (props.products) {
        products = props.products.map((prod, i) => {
            return (
                <tr key={prod + i} className="product-tr">
                    <td>{prod.name}</td>
                    <td>{prod.type}</td>
                    <td className="number-td">{prod.quantity >= 1 ? (prod.price * prod.quantity) : prod.price}
                        {prod.quantity >= 1 ? <span>{"(" + prod.price + ")"}</span> : null}</td>
                    <td className="number-td">{prod.quantity}</td>
                    <td>{prod.date.toString().slice(0, 10)}</td>
                    <td id="edit-td">
                        <Button click={() => props.productToEdit(prod)}
                            content='Edit'
                            name={props.editClicked ? "budg-edit-btn budg-edit-btn-disabled" : "budg-edit-btn"} />
                    </td>
                    <td id="edit-td">
                        <Button click={() => props.productToDelete(prod._id)}
                            content='Delete'
                            name="budg-edit-btn" />
                    </td>
                </tr>
            )
        })
    }
    return (
        <tbody>
            {products}
        </tbody>
    )
}

export default Tbody;