import React from 'react'
import './Table.css'
import Tbody from '../Tbody/Tbody'
import Thead from '../Thead/Thead'
import TableInfo from '../TableInfo/TableInfo'

function Table(props) {
    return (
        <div className="table-div">
            <h1>Products</h1>
            <TableInfo totalPrice={props.totalPrice}
                productsLength={props.products.length}
                selectModeHandler={props.selectModeHandler}
            />
            <Thead properties={props.properties} />
            <div className="products-div">
                <table className="budg-table">
                    <Tbody products={props.products}
                        productToEdit={props.productToEdit}
                        handleCheckboxChange={props.handleCheckboxChange}
                        editClicked={props.editClicked}
                    />
                </table>
            </div>
        </div>
    )
}

export default Table