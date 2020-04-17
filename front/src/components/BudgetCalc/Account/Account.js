import React, { Component } from 'react'
import './Account.css'
import TextInput from '../Inputs/TextInput/TextInput'
import EmailInput from '../Inputs/EmailInput/EmailInput'
import PasswordInput from '../Inputs/PasswordInput/PasswordInput'
import NumberInput from '../Inputs/NumberInput/NumberInput'
import Button from '../Button/Button'
import { accountClickedAction } from '../../../redux/actions/actions'
import { connect } from 'react-redux'

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            income: 0,
            email: '',
            password: ''
        }
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    closeAccountHandler = () => {
        this.props.accountClickedAction(false)
    }

    editAccountHandler = () => {
        alert("not available")
    }


    render() {
        return (
            <main className="account-main">
                <div className="account-div">
                    <h1>Account</h1>
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
                        <Button click={this.editAccountHandler}
                            content='Edit'
                            name='ng-btn' />
                    </div>
                </div>
            </main>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        accountClickedAction: (bool) => dispatch(accountClickedAction(bool))
    }
}

export default connect(null, mapDispatchToProps)(Account)