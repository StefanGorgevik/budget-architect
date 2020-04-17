import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { signInClickedAction, accountClickedAction, userLoggedIn } from '../../../redux/actions/userActions'

import './SignIn.css'

import Button from '../Button/Button'
import EmailInput from '../Inputs/EmailInput/EmailInput'
import PasswordInput from '../Inputs/PasswordInput/PasswordInput'
import Alert from '../Alert/Alert'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false
        }
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    closeSignInHandler = () => {
        this.props.signInClickedAction(false)
    }

    signInHandler = (e) => {
        e.preventDefault()
        if (this.state.email === '' || this.state.password === '') {
            this.setState({ error: true })
        } else {
            axios.post('http://localhost:8080/app/v1/auth/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    this.setState({ error: false })
                    console.log(res)
                    localStorage.setItem('jwt', res.data.jwt)
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('user-id', res.data.id)
                    this.props.signInClickedAction(false)
                    this.props.userLoggedIn(true)
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ error: true })
                    this.props.userLoggedIn(false)
                })
        }
    }

    closeErrorAlert = () => {
        this.setState({ error: false })
    }

    choseRegisterHandler = () => {
        this.props.signInClickedAction(false)
        this.props.accountClickedAction(true)
    }

    render() {
        return (
            <div className="sign-in-main">
                {this.state.error ? <Alert accept={this.closeErrorAlert}
                    text="Please fill up every field or check your credentials!"
                    show={false} />
                    : null}
                <div className="sign-in-div">
                    <h1>sign in</h1>
                    <EmailInput saveValue={this.saveInputValue} id="email" label='email' placeholder="email" />
                    <PasswordInput saveValue={this.saveInputValue} id="password" label='password' placeholder="password" />
                    <div className="btns-div">
                        <Button click={this.closeSignInHandler}
                            content='Close'
                            name='ng-btn' />
                        <Button click={this.signInHandler}
                            content='Sign In'
                            name='ng-btn' />
                    </div>
                    <p className="no-acc-p">To register, click 
                        <span onClick={this.choseRegisterHandler} className="here-span">here</span>
                        </p>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool)),
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool)),
        userLoggedIn: (bool) => dispatch(userLoggedIn(bool))

    }
}

export default connect(null, mapDispatchToProps)(SignIn)