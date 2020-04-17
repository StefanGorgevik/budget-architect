import React from 'react'
import './BudgetCalc.css'
import ProductInputs from '../../components/BudgetCalc/Inputs/ProductInputs/ProductInputs'
import TableTools from '../../components/BudgetCalc/TableTools/TableTools'
import Table from '../../components/BudgetCalc/BudgetTable/Table/Table'
import Groups from '../../components/BudgetCalc/Groups/Groups'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { sortGroups, sortProducts, editProduct, handleIsChecked } from '../../redux/actions/productsActions'
import Alert from '../../components/BudgetCalc/Alert/Alert'
import NewGroup from '../../components/BudgetCalc/NewGroupForm/NewGroup/NewGroup'
import Account from '../../components/BudgetCalc/Account/Account'
import SignIn from '../../components/BudgetCalc/SignIn/SignIn'
import axios from 'axios'
class BudgetCalc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {
                id: '',
                name: '',
                type: '',
                price: 0,
                quantity: 1,
                date: ''
            },
            products: props.products,
            isChecked: false,
            productsToDelete: [],
            editClicked: false,
            selectedValue: 'name',
            error: false
        }
    }

    componentDidMount() {
        if(this.state.isUserLogged) {
            var id = localStorage.getItem('user-id')
            axios.get(`http://localhost:8081/app/v1/products${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then((res) => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            }
    }

    handleInputValue = (event) => {
        this.setState({ ...this.state, product: { ...this.state.product, [event.target.id]: event.target.value } })
    }

    saveProduct = (e) => {
        var product = this.state.product
        var id = localStorage.getItem('user-id')
        e.preventDefault()
        if (product.name !== '' && product.type !== '' && product.price !== 0 && product.quantity >= 1 && product.date !== '') {
            axios.post('http://localhost:8081/app/v1/products/', {
                name: product.name,
                type: product.type,
                price: product.price,
                quantity: product.quantity,
                date: product.date,
                userID: id
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            // product.id = Math.floor(Math.random() * 1000)
            // product.isChecked = false
            // store.dispatch(saveProduct(product))
            // this.setState({
            //     product: { id: '', name: '', type: '', price: 0, quantity: 1, date: '' },
            //     editClicked: false
            // })
        } else {
            this.setState({ error: true })
        }
    }

    closeErrorAlert = () => {
        this.setState({ error: false })
    }

    handleCheckboxChange = (e) => {
        let val = e.target.value
        let checked = e.target.checked
        store.dispatch(handleIsChecked(val, checked))
    }

    productToEdit = (prod) => {
        store.dispatch(editProduct(prod))
        this.setState({
            editClicked: true,
            product: prod
        })
    }

    selectFilterHandler = (e) => {
        var val = e.target.value
        if (this.props.mode === 'products') {
            store.dispatch(sortProducts(val))
        } else {
            store.dispatch(sortGroups(val))
        }
    }

    render() {
        if (this.state.products) {
            var totPrice = 0;
            for (var i = 0; i < this.state.products.length; i++) {
                if (this.state.products[i].quantity >= 1) {
                    totPrice += (this.state.products[i].quantity * Number(this.state.products[i].price))
                } else if (this.state.products[i].quantity < 1) {
                    totPrice += Number(this.state.products[i].price)
                }
            }
        }
        return (
            <main className="budget-calc-main">
                {this.props.accountClicked ? <Account /> : null}
                {this.props.signInClicked && !this.props.isUserLogged ? <SignIn /> : null}
                {this.props.addNewGroupClicked ? <NewGroup /> : null}
                {this.state.error ? <Alert click={this.closeErrorAlert}
                    text="Please fill up every field!"
                /> : null}

                {this.props.isUserLogged ?
                    <>
                        {this.props.mode === "products" ?
                            <ProductInputs saveProduct={this.saveProduct}
                                handleInputValue={this.handleInputValue}
                                product={this.state.product}
                                editClicked={this.state.editClicked}
                                editProduct={this.editProduct}
                                types={this.state.types}
                            /> : null}
                        <div className="budget-calc-content-div">
                            {this.props.mode === "products" ?
                                <Table
                                    properties={this.state.properties}
                                    products={this.props.products}
                                    productToEdit={this.productToEdit}
                                    handleCheckboxChange={this.handleCheckboxChange}
                                    editClicked={this.state.editClicked}
                                    totalPrice={totPrice}
                                /> : <Groups />}
                            <TableTools
                                deleteProducts={this.deleteProducts}
                                selectFilterHandler={this.selectFilterHandler}
                            />
                        </div>
                    </> : null}
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        mode: state.productsReducer.mode,
        products: state.productsReducer.products,
        groups: state.productsReducer.productGroups,
        addNewGroupClicked: state.productsReducer.addNewGroupClicked,
        accountClicked: state.userReducer.accountClicked,
        signInClicked: state.userReducer.signInClicked,
        isUserLogged: state.userReducer.isUserLogged
    }
}

export default connect(mapStateToProps)(BudgetCalc)