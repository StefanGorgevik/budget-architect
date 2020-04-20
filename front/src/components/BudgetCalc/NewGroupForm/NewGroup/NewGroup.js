import React from 'react'
import './NewGroup.css'
import Inputs from '../Inputs-NG/Inputs'
import Table from '../Table-NG/Table'
import Button from '../../Button/Button'
import { addNewGroupClicked, saveGroup, isGroupSavedAction, editGroupAction } from '../../../../redux/actions/groupsActions'
import Alert from '../../Alert/Alert'
import axios from 'axios'
import { connect } from 'react-redux'
const URL = 'http://localhost:8082/'

class NewGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: '',
            date: '',
            newGroupProducts: [],
            product: {
                name: '',
                price: 0,
                quantity: 1
            },
            error: false
        }
    }

    componentDidMount() {
        if (this.props.groupToEdit) {
            var group = this.props.groupToEdit
            this.setState({
                store: group.store,
                date: group.date,
                newGroupProducts: group.products
            })
        }
    }

    handleProductInputValue = (event) => {
        this.setState({
            ...this.state,
            product: { ...this.state.product, [event.target.id]: event.target.value },
            [event.target.id]: event.target.value
        })
    }

    handleGroupDateInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    addProductToGroup = (e) => {
        e.preventDefault()
        var product = this.state.product
        if (this.state.product.name !== '' && product.price !== 0 && product.quantity > 0) {
            if (this.state.newGroupProducts) {
                var prods = this.state.newGroupProducts
                product.id = Math.floor(Math.random() * 1000)
                prods.push(product)
                this.setState({
                    newGroupProducts: prods,
                    product: { name: '', price: 0, quantity: 1 }
                })
            }
        } else {
            this.setState({ error: true })
        }
    }

    closeErrorAlert = () => {
        this.setState({ error: false })
    }

    removeProductFromGroup = (id) => {
        var products = this.state.newGroupProducts
        var dlt = products.filter((prod, i) => prod.id === id)
        products.splice(products.indexOf(dlt[0]), 1)
        this.setState({ newGroupProducts: products })
    }

    getTotalPrice = (products) => {
        if (products) {
            let totalPrice = 0;
            for (var i = 0; i < products.length; i++) {
                if (products[i].quantity > 1) {
                    totalPrice += (products[i].quantity * Number(products[i].price))
                } else {
                    totalPrice += Number(products[i].price)
                }
            }
            return totalPrice;
        }
    }

    saveGroupOfProducts = () => {
        if (this.state.date !== '') {
            var products = this.state.newGroupProducts
            var totalPrice = this.getTotalPrice(products);
            axios.post(URL + `app/v1/groups/`, {
                store: this.state.store,
                date: this.state.date,
                totalPrice: totalPrice,
                userID: localStorage.getItem('user-id'),
                products: this.state.newGroupProducts
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then(res => {
                    this.props.saveGroup(res.data)
                    this.setState({ newGroupProducts: [], date: '', store: '' })
                    this.props.addNewGroupClicked(false)
                    this.props.isGroupSavedAction(true)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.setState({ error: true })
        }
    }

    editGroupHandler = (event) => {
        event.preventDefault()
        var groupID = this.props.groupToEdit._id
        var products = this.state.newGroupProducts
        var totalPrice = this.getTotalPrice(products)
        var group = {
            _id: groupID,
            store: this.state.store,
            date: this.state.date,
            totalPrice: totalPrice,
            userID: localStorage.getItem('user-id'),
            products: this.state.newGroupProducts
        }
        if (this.state.date !== '' && this.state.newGroupProducts.length !== 0) {
            axios.put(URL + `app/v1/groups/${groupID}`,
                {
                    store: this.state.store,
                    date: this.state.date,
                    totalPrice: totalPrice,
                    userID: localStorage.getItem('user-id'),
                    products: this.state.newGroupProducts
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then((res) => {
                    this.props.editGroupAction(group)
                    this.setState({
                        error: false,
                        store: '',
                        date: '',
                        newGroupProducts: [],
                        product: { name: '', price: 0, quantity: 1 }
                    })
                    this.props.addNewGroupClicked(false)
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ error: true })
                })
        } else {
            this.setState({ error: true })
        }
    }

    closeNewGroup = () => {
        this.props.addNewGroupClicked(false)
    }

    render() {
        var products = this.state.newGroupProducts
        var totalPrice = this.getTotalPrice(products)
        return (
            <main className="ng-main">
                {this.state.error ? <Alert accept={this.closeErrorAlert} text="Please fill up every field!" show={false} /> : null}
                <div className="ng-div">
                    <div className='ng-left-side'>
                        <h3>New group of products</h3>
                        <Inputs addProductToGroup={this.addProductToGroup}
                            handleGroupDateInputValue={this.handleGroupDateInputValue}
                            handleProductInputValue={this.handleProductInputValue}
                            product={this.state.product}
                            dateValue={this.state.date}
                        />
                        <div className="ng-btns-div">
                            <Button click={this.closeNewGroup}
                                content='Close'
                                name='ng-btn ng-close-btn' />
                            <Button click={this.props.groupToEdit ? this.editGroupHandler : this.saveGroupOfProducts}
                                content={this.props.groupToEdit ? 'Edit group' : 'Save group'}
                                name='ng-btn' />
                        </div>
                    </div>
                    <div className="ng-right-side">
                        <Table products={this.state.newGroupProducts}
                            totalPrice={totalPrice}
                            removeProductFromGroup={this.removeProductFromGroup}
                        />
                    </div>

                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.groupsReducer.groupToEdit)
    return {
        groupToEdit: state.groupsReducer.groupToEdit
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewGroupClicked: (bool) => dispatch(addNewGroupClicked(bool)),
        isGroupSavedAction: (bool) => dispatch(isGroupSavedAction(bool)),
        saveGroup: (data) => dispatch(saveGroup(data)),
        editGroupAction: (data) => dispatch(editGroupAction(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewGroup); 