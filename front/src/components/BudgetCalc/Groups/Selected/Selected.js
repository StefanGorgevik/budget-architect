import React from 'react'
import './Selected.css'
import Table from '../../NewGroupForm/Table-NG/Table'
import Button from '../../Button/Button'

function Selected(props) {
    var productsLength = 0;
    if (props.products) {
        productsLength = props.products.length
    }
    return (
        <div className="sg-main">
            <div className="sg-div">
                {productsLength !== 0 ? <>
                    <h1>Products</h1>
                    <Table products={props.products}
                        totalPrice={props.totalPrice}
                    /> </> : <h2>Select a group</h2>}
                <div className="sg-btn-div">
                    <Button click={props.closeSelectedGroup}
                        content='Close'
                        name='ng-btn' />
                    <Button click={() => props.editGroup(props.selectedGroup)}
                        content='Edit'
                        name='ng-btn' />
                </div>
            </div>
        </div>
    )
}

export default Selected;