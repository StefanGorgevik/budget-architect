import React from 'react'
import './Tbody.css'
import Checkbox from '../../Checkbox/Checkbox'
import Button from '../../Button/Button'

function Tbody(props) {
    const products = props.products.map((prod, i) => {
        return (
            <tr key={prod + i} className="product-tr">
                <td id="checkbox-td">
                    <Checkbox handleCheckboxChange={(e) => props.handleCheckboxChange(e)}
                        prods={props.products}
                        i={i}
                        checked={prod.isChecked}
                        value={prod.name}
                    />
                </td>
                <td>{prod.name}</td>
                <td>{prod.type}</td>
                <td className="number-td">{prod.quantity >= 1 ? (prod.price * prod.quantity) : prod.price}
                    {prod.quantity >= 1 ? <span>{"(" + prod.price + ")"}</span> : null}</td>
                <td className="number-td">{prod.quantity}</td>
                <td>{prod.date}</td>
                <td id="edit-td">
                    <Button click={() => props.productToEdit(prod)}
                        content='Edit'
                        name={props.editClicked ? "budg-edit-btn budg-edit-btn-disabled " : "budg-edit-btn"} />
                </td>
            </tr>
        )
    })
    return (
        <tbody>
            {products}
        </tbody>
    )
}

export default Tbody;