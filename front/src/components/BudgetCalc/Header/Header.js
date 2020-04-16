import React from 'react'
import './Header.css'
import {accountClickedAction, signInClickedAction} from '../../../redux/actions/actions'
import {connect} from 'react-redux'

function Header(props) {

    const accountClickedHandler = () => {
        props.accountClickedAction(true)
    }
    const signInClickedHandler = () => {
        props.signInClickedAction(true)
    }

    return (
        <nav className="header-main">
            <h1 className="header-title">Budget Architect</h1>
            <ul className="header-ul">
                <li onClick={accountClickedHandler}>Account</li>
                <li onClick={signInClickedHandler}>Sign In</li>
            </ul>
        </nav>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool))
    }
}

export default connect(null, mapDispatchToProps)(Header);