import React from 'react'
import './HeaderInfo.css'

function HeaderInfo(props) {
    var surplus = localStorage.getItem('income') - props.totalPrice;
    return (
        <main className="head-info-main">
            <p className="head-info-p">Budget <span>{localStorage.getItem('income')}</span></p>
            <p className="head-info-p">Remaining <span>{surplus}</span></p>
        </main>
    )
}

export default HeaderInfo
