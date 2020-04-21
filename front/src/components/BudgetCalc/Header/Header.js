import React from 'react'
import './Header.css'
import { accountClickedAction, signInClickedAction, signOutClickedAction } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import HeaderInfo from '../HeaderInfo/HeaderInfo'

function Header(props) {
    const accountClickedHandler = () => {
        props.accountClickedAction(true)
    }
    const signInClickedHandler = () => {
        props.signInClickedAction(true)
    }
    const signOutHandler = () => {
        props.signOutClickedAction(true)
    }

    var isUserLogged = localStorage.getItem('userLogged') === 'true'

    var totalPrice = 0;
    var products;
    if (props.products) {
        products = props.products
        for (var i = 0; i < products.length; i++) {
            if (products[i].quantity >= 1) {
                totalPrice += (products[i].quantity * Number(products[i].price))
            } else if (products[i].quantity < 1) {
                totalPrice += Number(products[i].price)
            }
        }
    }

    return (
        <nav className="header-main">
            <h1 className="header-title">Budget Architect</h1>
            <HeaderInfo totalPrice={totalPrice} />
            <ul className="header-ul">
                <li onClick={accountClickedHandler}>{isUserLogged ? "Account" : "Register"}</li>
                <li onClick={isUserLogged ? signOutHandler : signInClickedHandler}>{isUserLogged ? "Sign Out" : "Sign In"}</li>
            </ul>
        </nav>
    )
}


function mapStateToProps(state) {
    return {
        products: state.productsReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool)),
        signOutClickedAction: (bool) => dispatch(signOutClickedAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);