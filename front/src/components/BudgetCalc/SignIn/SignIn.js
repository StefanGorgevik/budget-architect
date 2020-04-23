import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { signInClickedAction, accountClickedAction } from '../../../redux/actions/userActions'
import './SignIn.css'
import Button from '../Button/Button'
import EmailInput from '../Inputs/EmailInput/EmailInput'
import PasswordInput from '../Inputs/PasswordInput/PasswordInput'
import Alert from '../Alert/Alert'
const URL = 'https://budgetarchitect.herokuapp.com/'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false,
            userNotFound: false
        }
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    closeSignInHandler = () => {
        this.props.signInClickedAction(false)
    }

    signInHandler = () => {
        if (this.state.email === '' || this.state.password === '') {
            this.setState({ error: true })
        } else {
            axios.post(URL + 'app/v1/auth/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    console.log(res)
                    this.setState({ error: false, userNotFound: false })
                    localStorage.setItem('jwt', res.data.jwt)
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('user-id', res.data.id)
                    localStorage.setItem('income', res.data.income)
                    localStorage.setItem('userLogged', 'true')
                    localStorage.setItem('mode', 'products')
                    this.props.signInClickedAction(false)
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ error: true })
                    if(error.response.status === 500) {
                        this.setState({userNotFound: true})
                    }
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
                    text="User not found! Please fill up every field or check your credentials!"
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
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)