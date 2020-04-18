import React from 'react'
import './TableInfo.css'
import Select from '../../Select/Select'

function TableInfo(props) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const defaultMonth = months[props.selectedMonth]
    console.log(defaultMonth)
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(1), (val, index) => index + year);
    return (
        <div className="table-info-div">
            <p className="price-p">Total price: <span>{props.totalPrice}</span></p>
            <p className="price-p">Number of products: <span>{props.productsLength}</span></p>
            <div className="table-info-selects">
                <Select options={months} selectOption={props.selectMonth} label='month' defaultChecked={defaultMonth}/>
                <Select options={years} selectOption={props.selectYear} label='year' />
            </div>
        </div>
    )
}

export default TableInfo