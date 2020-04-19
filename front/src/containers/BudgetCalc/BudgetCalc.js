import React from 'react'
import './BudgetCalc.css'
import ProductInputs from '../../components/BudgetCalc/ProductInputs/ProductInputs'
import TableTools from '../../components/BudgetCalc/TableTools/TableTools'
import Table from '../../components/BudgetCalc/BudgetTable/Table/Table'
import Groups from '../../components/BudgetCalc/Groups/Groups'
import { connect } from 'react-redux'
import { signOutClickedAction } from '../../redux/actions/userActions'
import { sortProducts, productToEdit, saveProduct, editProduct } from '../../redux/actions/productsActions'
import { sortGroups } from '../../redux/actions/groupsActions'
import Alert from '../../components/BudgetCalc/Alert/Alert'
import NewGroup from '../../components/BudgetCalc/NewGroupForm/NewGroup/NewGroup'
import Account from '../../components/BudgetCalc/Account/Account'
import SignIn from '../../components/BudgetCalc/SignIn/SignIn'
import axios from 'axios'
const URL = 'http://localhost:8081/'

class BudgetCalc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {
                name: '',
                type: '',
                price: 0,
                quantity: 1,
                date: ''
            },
            editClicked: false,
            selectedValue: 'name',
            error: false,
            prodToEditID: ''
        }
    }

    componentWillUnmount() {
        localStorage.clear()
    }

    handleInputValue = (event) => {
        this.setState({ ...this.state, product: { ...this.state.product, [event.target.id]: event.target.value } })
    }

    saveProductHandler = (e) => {
        var product = this.state.product
        var id = localStorage.getItem('user-id')
        e.preventDefault()
        if (product.name !== '' && product.type !== '' && product.price !== 0 && product.quantity >= 1 && product.date !== '') {
            axios.post(URL + 'app/v1/products/', {
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
                    this.props.saveProduct(res.data)
                    this.setState({
                        product: { name: '', type: '', price: 0, quantity: 1, date: '' },
                        editClicked: false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.setState({ error: true })
        }
    }

    closeErrorAlert = () => {
        this.setState({ error: false })
    }

    productToEditHandler = (prod) => {
        this.props.productToEdit(prod)
        this.setState({
            editClicked: true,
            product: prod,
            prodToEditID: prod._id
        })
    }

    editProductHandler = (event) => {
        var prodID = this.state.prodToEditID
        var product = this.state.product
        var userID = localStorage.getItem('user-id')
        event.preventDefault()
        if (product.name !== '' && product.type !== '' && product.price !== 0 && product.quantity >= 1 && product.date !== '') {
            axios.put(URL + `app/v1/products/${prodID}`,
                {
                    name: product.name,
                    type: product.type,
                    price: product.price,
                    quantity: product.quantity,
                    date: product.date,
                    userID: userID
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then(res => {
                    this.setState({
                        editClicked: false,
                        error: false,
                        product: { name: '', type: '', price: 0, quantity: 1, date: '' }
                    })
                    this.props.editProduct(product)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.setState({ error: true })
        }
    }

    selectFilterHandler = (e) => {
        var val = e.target.value
        if (this.props.mode === 'products') {
            this.props.sortProducts(val)
        } else {
            this.props.sortGroups(val)
        }
    }

    signOutHandler = () => {
        localStorage.clear()
        window.location.reload();
    }
    declineSignOutHandler = () => {
        this.props.signOutClickedAction(false)
    }

    render() {
        var isUserLogged = localStorage.getItem('userLogged') === 'true'
        return (
            <main className="budget-calc-main">
                {this.props.accountClicked ? <Account /> : null}
                {this.props.signInClicked && !this.props.isUserLogged ? <SignIn /> : null}
                {this.props.addNewGroupClicked ? <NewGroup /> : null}
                {this.state.error ? <Alert accept={this.closeErrorAlert}
                    text="Please fill up every field!"
                /> : null}
                {this.props.signOutClicked ? <Alert accept={this.signOutHandler} decline={this.declineSignOutHandler}
                    text="Your are about to sign out! Are you sure?" show={true}
                /> : null}
                {isUserLogged ? <> 
                {this.props.mode === "products" ? 
                    <ProductInputs
                        handleInputValue={this.handleInputValue}
                        product={this.state.product}
                        editClicked={this.state.editClicked}
                        editProduct={this.editProductHandler}
                        saveProduct={this.saveProductHandler}
                        types={this.state.types}
                    /> : null}
                <div className="budget-calc-content-div">
                    {this.props.mode === "products" ?
                        <Table
                            properties={this.state.properties}
                            products={this.props.products}
                            productToEdit={this.productToEditHandler}
                            handleCheckboxChange={this.handleCheckboxChange}
                            editClicked={this.state.editClicked}
                        /> : <Groups />}
                    <TableTools
                        deleteProducts={this.deleteProducts}
                        selectFilterHandler={this.selectFilterHandler}
                    />
                </div>
                </> : 
                <div>
                <h1 className="welcome-h1">Please sign in or register!</h1>
                </div>}
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.productsReducer.products,
        mode: state.groupsReducer.mode,
        groups: state.groupsReducer.productGroups,
        addNewGroupClicked: state.groupsReducer.addNewGroupClicked,
        accountClicked: state.userReducer.accountClicked,
        signInClicked: state.userReducer.signInClicked,
        signOutClicked: state.userReducer.signOutClicked
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveProduct: (prod) => dispatch(saveProduct(prod)),
        productToEdit: (id) => dispatch(productToEdit(id)),
        editProduct: (prod) => dispatch(editProduct(prod)),
        sortProducts: (val) => dispatch(sortProducts(val)),
        sortGroups: (val) => dispatch(sortGroups(val)),
        signOutClickedAction: (bool) => dispatch(signOutClickedAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCalc)