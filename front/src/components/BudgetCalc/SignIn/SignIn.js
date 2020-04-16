import React, { Component } from 'react'
import './SignIn.css'
import Button from '../Button/Button'
import EmailInput from '../Inputs/EmailInput/EmailInput'
import PasswordInput from  '../Inputs/PasswordInput/PasswordInput'
import {signInClickedAction} from '../../../redux/actions/actions'
import { connect } from 'react-redux'

class SignIn extends Component {
    constructor(props) {
        super(props) 
            this.state = {
                email: '',
                password: ''
            }
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    closeSignInHandler = () => {
        this.props.signInClickedAction(false)
    }

    signInHandler = () => {
        alert("not available")
    }
    render() {
        return (
            <div className="sign-in-main">
                <div className="sign-in-div"> 
                    <h1>sign in</h1>
                    <EmailInput saveValue={this.saveInputValue} id="email" label='email' placeholder="email"/>
                    <PasswordInput saveValue={this.saveInputValue} id="password" label='password' placeholder="password"/>
                    <div className="btns-div">
                        <Button click={this.closeSignInHandler}
                            content='Close'
                            name='ng-btn' />
                        <Button click={this.signInHandler}
                            content='Edit'
                            name='ng-btn' />
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch ) {
    return { 
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)