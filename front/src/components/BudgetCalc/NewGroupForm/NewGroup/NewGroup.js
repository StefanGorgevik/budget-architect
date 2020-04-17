import React from 'react'
import './NewGroup.css'
import Inputs from '../Inputs-NG/Inputs'
import Table from '../Table-NG/Table'
import Button from '../../Button/Button'
import store from '../../../../redux/store'
import { addNewGroupClicked, saveGroup } from '../../../../redux/actions/actions'
import Alert from '../../Alert/Alert'

class NewGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        if (product.name !== '' && product.price !== 0 && product.quantity > 0) {
            var prods = this.state.newGroupProducts
            product.id = Math.floor(Math.random() * 1000)
            prods.push(product)
            this.setState({
                newGroupProducts: prods,
                product: { name: '', price: 0, quantity: 1 }
            })
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

    saveGroupOfProducts = () => {
        if (this.state.date !== '') {
            var products = this.state.newGroupProducts
            var totalPrice = this.getTotalPrice(products);
            const productGroup = {
                id: Math.floor(Math.random() * 1000),
                groupDate: this.state.date,
                groupTotalPrice: totalPrice,
                products: this.state.newGroupProducts
            }
            this.setState({ newGroupProducts: [], date: '' })
            store.dispatch(addNewGroupClicked(false))
            store.dispatch(saveGroup(productGroup))
        } else {
            this.setState({ error: true })
        }
    }

    closeNewGroup = () => {
        store.dispatch(addNewGroupClicked(false))
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
                            product={this.state.product} />
                        <div className="ng-btns-div">
                            <Button click={this.closeNewGroup}
                                content='Close'
                                name='ng-btn ng-close-btn' />
                            <Button click={this.saveGroupOfProducts}
                                content='Save group'
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



export default NewGroup; 