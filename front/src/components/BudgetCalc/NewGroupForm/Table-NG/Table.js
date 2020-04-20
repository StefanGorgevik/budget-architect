import React from 'react'
import './Table.css'
import TableInfo from '../TableInfo/TableInfo'
import { connect } from 'react-redux'

function Table(props) {
    if (props.products) {
        var products = props.products;
        var prods = props.products.map((prod, i) => {
            return (
                <tr key={prod.name + i}
                    className="ng-new-prod-tr">
                    <td className='ng-new-prod-td'>{prod.name}</td>
                    <td className='ng-new-prod-td'>{prod.quantity !== 0 ? (prod.price * prod.quantity) : prod.price}
                        {prod.quantity !== 0 ? <span>{"(" + prod.price + ")"}</span> : null}</td>
                    <td className='ng-new-prod-td'>{prod.quantity}</td>
                    {!props.addNewGroupClicked ? null :
                        <td className="x-td" onClick={() => props.removeProductFromGroup(prod.id)}>X</td>}
                </tr>
            )
        })
    }
    return (
        <>
            <TableInfo productsLength={products ? products.length : null}
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
        mode: state.groupsReducer.mode,
        addNewGroupClicked: state.groupsReducer.addNewGroupClicked
    }
}

export default connect(mapStateToProps)(Table)