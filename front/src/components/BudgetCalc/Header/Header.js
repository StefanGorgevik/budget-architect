import React from 'react'
import './Header.css'
import { accountClickedAction, signInClickedAction } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'

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
                <li onClick={accountClickedHandler}>{props.isUserLogged ? "Account" : "Register"}</li>
                <li onClick={signInClickedHandler}>{props.isUserLogged ? "Sign Out" : "Sign In"}</li>
            </ul>
        </nav>
    )
}

function mapStateToProps(state) {
    return {
        isUserLogged: state.userReducer.isUserLogged
    }
}
function mapDispatchToProps(dispatch) {
    return {
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);