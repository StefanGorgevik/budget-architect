import React from 'react'
import './Table.css'
import TableInfo from '../TableInfo/TableInfo'
import { connect } from 'react-redux'

function Table(props) {
        var prods = props.products.map((prod, i) => {
            return (
                <tr key={prod.name + i}
                    className="ng-new-prod-tr">
                    <td>{prod.name}</td>
                    <td>{prod.quantity !== 0 ? (prod.price * prod.quantity) : prod.price}
                        {prod.quantity !== 0 ? <span>{"(" + prod.price + ")"}</span> : null}</td>
                    <td>{prod.quantity}</td>
                    {!props.addNewGroupClicked ? null :
                        <td className="x-td" onClick={() => props.removeProductFromGroup(prod.id)}>X</td>}
                </tr>
            )
        })
    return (
        <>
            <TableInfo productsLength={props.products.length}
                totalPrice={props.totalPrice}
            />
            <table className="ng-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {!props.addNewGroupClicked ? null :
                            <th></th>}
                    </tr>
                </thead>
                <tbody className="ng-table-body">
                    {prods}
                </tbody>
            </table>
        </>
    )
}

function mapStateToProps(state) {
    return {
        mode: state.mode,
        addNewGroupClicked: state.addNewGroupClicked,
        productToEdit: state.productToEdit,
        editGroupClicked: state.editGroupClicked
    }
}

export default connect(mapStateToProps)(Table)