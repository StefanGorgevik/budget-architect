import React, { Component } from 'react'
import './Account.css'
import TextInput from '../Inputs/TextInput/TextInput'
import EmailInput from '../Inputs/EmailInput/EmailInput'
import PasswordInput from '../Inputs/PasswordInput/PasswordInput'
import NumberInput from '../Inputs/NumberInput/NumberInput'
import Button from '../Button/Button'
import { accountClickedAction, signInClickedAction, userLoggedIn } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import axios from 'axios'
import Alert from '../Alert/Alert'

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            income: 0,
            email: '',
            password: '',
            error: false
        }
    }
    getUserToEdit = () => {
        var id = localStorage.getItem('user-id')
        axios.get(`http://localhost:8080/app/v1/getuser/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => {
            console.log(res.data[0])
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

    componentDidMount() {
        if(this.props.isUserLogged) {
            this.getUserToEdit()            
        }
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    closeAccountHandler = () => {
        this.props.accountClickedAction(false)
    }

    registerUserHandler = (e) => {
        e.preventDefault()
        if (this.state.name === '' || this.state.income === 0 || this.state.email === '' || this.state.password === '') {
            this.setState({ error: true })
        } else { 
        axios.post('http://localhost:8080/app/v1/auth/register', {
            name: this.state.name,
            income: this.state.income,
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {                
                axios.post('http://localhost:8080/app/v1/auth/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    console.log(res)
                    this.props.userLoggedIn(true)
                    this.props.signInClickedAction(false)
                    this.props.accountClickedAction(false)
                    localStorage.setItem('jwt', res.data.jwt)
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('user-id', res.data.id)
                    this.setState({ error: false })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ error: true })
                    this.props.userLoggedIn(false)
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    closeErrorAlert = () => {
        this.setState({ error: false})
    }

    choseSignInHandler = () => {
        this.props.signInClickedAction(true)
        this.props.accountClickedAction(false)
    }

    render() {
        return (
            <main className="account-main">
                {this.state.error ? <Alert accept={this.closeErrorAlert} text="Please fill up every field!" show={false}/> : null}
                <div className="account-div">
                    <h1>{this.props.isUserLogged ? "Account" : 'Register'}</h1>
                    <TextInput saveValue={this.saveInputValue} id="name"
                        label='full name' placeholder="full name"
                        value={this.state.name} />
                    <NumberInput saveValue={this.saveInputValue}
                        id="income" label='income' placeholder="income"
                        value={this.state.income} />
                    <EmailInput saveValue={this.saveInputValue}
                        id="email" label='email' placeholder="email"
                        value={this.state.email} />
                    <PasswordInput saveValue={this.saveInputValue}
                        id="password" label='password' placeholder="password"
                        value={this.state.password} />
                    <div className="btns-div">
                        <Button click={this.closeAccountHandler}
                            content='Close'
                            name='ng-btn' />
                        <Button click={this.registerUserHandler}
                            content={this.props.isUserLogged ? "Edit" : 'Register'}
                            name='ng-btn' />
                    </div>
                    <p className="no-acc-p">To sign in, click 
                        <span onClick={this.choseSignInHandler} className="here-span">here</span>
                        </p>
                </div>
            </main>
        )
    } 
}

function mapStateToProps(state) {
    console.log(state.userReducer.userToEdit)
    return {
      isUserLogged: state.userReducer.isUserLogged,
      userToEdit: state.userReducer.userToEdit
    }
}
function mapDispatchToProps(dispatch) {
    return {
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool)),
        userLoggedIn: (bool) => dispatch(userLoggedIn(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)