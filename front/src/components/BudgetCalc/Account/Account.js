import React, { Component } from 'react'
import './Account.css'
import TextInput from '../Inputs/TextInput/TextInput'
import EmailInput from '../Inputs/EmailInput/EmailInput'
import PasswordInput from '../Inputs/PasswordInput/PasswordInput'
import NumberInput from '../Inputs/NumberInput/NumberInput'
import Button from '../Button/Button'
import { accountClickedAction, signInClickedAction } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import axios from 'axios'
import Alert from '../Alert/Alert'
const URL = 'https://budgetarchitect.herokuapp.com/'

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            income: 0,
            email: '',
            password: '',
            error: false,
            userExists: false
        }
    }

    componentDidMount() {
        var isUserLogged = localStorage.getItem('userLogged') === 'true'
        if (isUserLogged) {
            this.getUserToEdit()
        }
    }

    getUserToEdit = () => {
        var id = localStorage.getItem('user-id')
        axios.get(`${URL}app/v1/auth/getuser/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    name: res.data[0].name,
                    income: res.data[0].income,
                    email: res.data[0].email,
                    password: res.data[0].password
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    closeAccountHandler = () => {
        this.props.accountClickedAction(false)
    }

    registerUserHandler = (e) => {
        e.preventDefault()
        if (this.state.name !== '' && this.state.income !== 0 && this.state.email !== '' && this.state.password !== '') {
            axios.post(URL + 'app/v1/auth/register', {
                name: this.state.name,
                income: this.state.income,
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    axios.post(URL + 'app/v1/auth/login', {
                        email: this.state.email,
                        password: this.state.password
                    })
                        .then(res => {
                            this.setState({ error: false })
                            console.log(res)
                            localStorage.setItem('jwt', res.data.jwt)
                            localStorage.setItem('name', res.data.name)
                            localStorage.setItem('user-id', res.data.id)
                            localStorage.setItem('userLogged', 'true')
                            localStorage.setItem('mode', 'products')
                            localStorage.setItem('income', res.data.income)
                            this.props.signInClickedAction(false)
                            window.location.reload()
                        })
                        .catch(err => {
                            this.setState({ error: true })
                        })
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status === 500) {
                        this.setState({ userExists: true })
                    }
                })
        } else {
            this.setState({ error: true })
        }
    }

    editUserHandler = () => {
        var userID = localStorage.getItem('user-id')
        axios.put(URL + `app/v1/auth/updateuser/${userID}`, {
            name: this.state.name,
            income: this.state.income,
            email: this.state.email
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then((res) => {
                console.log(res)
                localStorage.setItem('income', this.state.income)
                this.props.accountClickedAction(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    closeErrorAlert = () => {
        this.setState({ error: false })
    }

    choseSignInHandler = () => {
        this.props.signInClickedAction(true)
        this.props.accountClickedAction(false)
    }

    render() {
        var isUserLogged = localStorage.getItem('userLogged')
        return (
            <main className="account-main">
                {this.state.error ? <Alert accept={this.closeErrorAlert} text="Please fill up every field!" show={false} /> : null}
                <div className="account-div">
                    <h1>{isUserLogged ? "Account" : 'Register'}</h1>
                    <div className="account-inputs">
                        <TextInput saveValue={this.saveInputValue} id="name"
                            label='full name' placeholder="full name"
                            value={this.state.name} />
                        <NumberInput saveValue={this.saveInputValue}
                            id="income" label='monthly income' placeholder="monthly income"
                            value={this.state.income} />
                        <EmailInput saveValue={this.saveInputValue}
                            id="email" label='email' placeholder="email"
                            value={this.state.email} />
                        {!isUserLogged ?
                            <PasswordInput saveValue={this.saveInputValue}
                                id="password" label='password' placeholder="password"
                                value={this.state.password} /> :
                            null}
                    </div>
                    {this.state.userExists ? <p>User already exists!</p> : null}
                    <div className="btns-div">
                        <Button click={this.closeAccountHandler}
                            content='Close'
                            name='ng-btn' />
                        <Button click={isUserLogged ? this.editUserHandler : this.registerUserHandler}
                            content={isUserLogged ? "Edit" : 'Register'}
                            name='ng-btn' />
                    </div>
                    {isUserLogged ? null :
                        <p className="no-acc-p">To sign in, click
                        <span onClick={this.choseSignInHandler} className="here-span">here</span>
                        </p>}
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        userToEdit: state.userReducer.userToEdit
    }
}
function mapDispatchToProps(dispatch) {
    return {
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)