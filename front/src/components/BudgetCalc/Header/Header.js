import React from 'react'
import './Header.css'
import { accountClickedAction, signInClickedAction, signOutClickedAction } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'

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

    return (
        <nav className="header-main">
            <h1 className="header-title">Budget Architect</h1>
            <ul className="header-ul">
                <li onClick={accountClickedHandler}>{isUserLogged ? "Account" : "Register"}</li>
                <li onClick={isUserLogged ? signOutHandler : signInClickedHandler}>{isUserLogged ? "Sign Out" : "Sign In"}</li>
            </ul>
        </nav>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool)),
        signOutClickedAction: (bool) => dispatch(signOutClickedAction(bool))
    }
}

export default connect(null, mapDispatchToProps)(Header);