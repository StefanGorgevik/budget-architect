import React from 'react'
import './HeaderInfo.css'

import Select from '../Select/Select'
import Button from '../Button/Button'

function HeaderInfo(props) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(1), (val, index) => index + year).reverse();
    var surplus = localStorage.getItem('income') - props.totalPrice - props.groupsTotalPrice;
    return (
        <main className="head-info-main">
            {props.isUserLogged ? <>
                <div className="total-info-div">
                    <p className="head-info-p budget-p">Monthly Budget <span>{localStorage.getItem('income')}</span></p>
                    {props.isMonthSelected ?
                        <p className='head-info-p remaining-p'>Remaining <span>{surplus}</span></p>
                        : null}
                </div>
                <div className="products-info-div">
                    <p className="head-info-p">Price <span>{props.totalPrice}</span></p>
                    <p className="head-info-p">Products
                <span>{props.productsLength}</span>
                    </p>
                </div>
                <div className="groups-info-div">
                    <p className="head-info-p groups-p">Groups
                  <span>{props.groupsLength}</span>
                    </p>
                    <p className="head-info-p">Products
                <span>{props.groupsProductsNumber}</span>
                    </p>
                    <p className="head-info-p">Price
                <span>{props.groupsTotalPrice}</span>
                    </p>
                </div>
                <div className="table-info-selects">
                    <p className="label-p">Filter: </p>
                    <Select options={months} selectOption={props.selectFilter}
                        selectedMonth={props.selectedMonth} label='month' value={props.selectedMonth} />
                    <Select options={years} selectOption={props.selectFilter}
                        selectedMonth={props.selectedMonth} label='year' />
                         <Button click={props.getAll}
                    content='See all'
                    name='table-info-btn hinfo-btn' />
                </div>
            </> : <div>
                    <h1 className="welcome-h1">Please sign in or register to see your products!</h1>
                </div>
            }
        </main>
    )
}


export default HeaderInfo