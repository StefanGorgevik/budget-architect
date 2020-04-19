import React from 'react'
import './TableInfo.css'
import Select from '../../Select/Select'
import Button from '../../Button/Button'

function TableInfo(props) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(1), (val, index) => index + year).reverse();
    return (
        <div className="table-info-div">
            <p className="price-p">Total price: <span>{props.totalPrice}</span></p>
            <p className="price-p">Number of products: <span>{props.productsLength}</span></p>
            <div className="table-info-selects">    
                <p className="label-p">Month: </p>
                <Select options={months} selectOption={props.selectFilterHandler} selectedMonth={props.selectedMonth} label='month' value={props.selectedMonth}/>
                <Select options={years} selectOption={props.selectFilterHandler} selectedMonth={props.selectedMonth} label='year' />
            </div>
            <Button click={props.getAllProducts}
                content='See all'
                name='table-info-btn' />
        </div>
    )
}

export default TableInfo