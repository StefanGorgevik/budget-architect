import React from 'react'
import './HeaderInfo.css'

import Select from '../Select/Select'
import Button from '../Button/Button'

function HeaderInfo(props) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(1), (val, index) => index + year).reverse();
    var surplus = localStorage.getItem('income') - props.totalPrice;
    var mode = localStorage.getItem('mode')
    return (
        <main className="head-info-main">
            <p className="head-info-p">Monthly Budget <span>{localStorage.getItem('income')}</span></p>
            {props.isMonthSelected ?
                <p className={surplus < 0 ? "head-info-p danger-p" : 'head-info-p'}>Remaining <span>{surplus}</span></p>
                : null}
            <p className="head-info-p">Total price <span>{mode === 'products' ? props.totalPrice : props.groupsTotalPrice}</span></p>
            <p className="head-info-p">Total Products
            <span>{mode === 'products' ? props.productsLength : props.groupsProductsNumber}</span>
            </p>
            {mode === 'groups' ?
                <p className="head-info-p">Total Groups
            <span>{props.groupsLength}</span>
                </p> : null}
            <div className="table-info-selects">
                <p className="label-p">Month: </p>
                <Select options={months} selectOption={props.selectFilter}
                    selectedMonth={props.selectedMonth} label='month' value={props.selectedMonth} />
                <Select options={years} selectOption={props.selectFilter}
                    selectedMonth={props.selectedMonth} label='year' />
            </div>
            <Button click={props.getAllProducts}
                content='See all'
                name='table-info-btn' />
        </main>
    )
}


export default HeaderInfo