import React from 'react'
import './BudgetCalc.css'
import ProductInputs from '../../components/BudgetCalc/ProductInputs/ProductInputs'
import TableTools from '../../components/BudgetCalc/TableTools/TableTools'
import Table from '../../components/BudgetCalc/BudgetTable/Table/Table'
import Groups from '../../components/BudgetCalc/Groups/Groups'
import { connect } from 'react-redux'
import { signOutClickedAction } from '../../redux/actions/userActions'
import { getProducts, sortProducts, productToEdit, saveProduct, editProduct, isProductSavedAction } from '../../redux/actions/productsActions'
import { sortGroups, getGroupsAction } from '../../redux/actions/groupsActions'
import Alert from '../../components/BudgetCalc/Alert/Alert'
import HeaderInfo from '../../components/BudgetCalc/HeaderInfo/HeaderInfo'
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
            prodToEditID: '',
            productsLoaded: false,
            groupsLoaded: false,
            selectedMonth: 'default',
            selectedYear: '2020',
            isMonthSelected: false,
            mode: 'products'
        }
    }

    componentDidMount() {
        this.getAllProductsHandler()
        this.getAllGroupsHandler()
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
                    this.props.isProductSavedAction(true)
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

    selectSortHandler = (e) => {
        if (this.state.mode === 'products') {
            this.props.sortProducts(e.target.value)
        } else {
            this.props.sortGroups(e.target.value)
        }
    }

    signOutHandler = () => {
        localStorage.clear()
        window.location.reload();
    }
    declineSignOutHandler = () => {
        this.props.signOutClickedAction(false)
    }

    getAllProductsHandler = () => {
        this.setState({ isMonthSelected: false })
        axios.get(URL + "app/v1/products/get/",
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                this.setState({ selectedMonth: 'default', productsLoaded: true })
                this.props.getProducts(res.data)
            })
            .catch(err => {
                this.setState({ productsLoaded: false })
                console.log(err)
            })
    }

    getAllGroupsHandler = () => {
        axios.get('http://localhost:8082/app/v1/groups/get/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({ groupsLoaded: true })
                this.props.getGroupsAction(res.data)
            })
            .catch(err => {
                this.setState({ groupsLoaded: false })
                console.log(err)
            })
    }

    selectFilterHandler = (event) => {
        this.setState({ isMonthSelected: true })
        var year = this.state.selectedYear;
        var month
        if (event.target.value.length === 4) {
            year = event.target.value
            this.setState({ selectedYear: event.target.value })
        } else if (event.target.value.length < 4) {
            month = event.target.value
            this.setState({ selectedMonth: event.target.value })
        }
        if (event.target.value === 'default') {
                this.getAllProductsHandler()
                this.getAllGroupsHandler()
        } else if (event.target.value !== 'default') {
            this.getFilteredProductsHandler(month, year)
        }
    }

    getFilteredProductsHandler = (mon, yr) => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }
        var year = yr;
        var month = mon;
        month = parseInt(month) + 1
        if (month < 10) {
            month = "0" + month.toString();
        }
        let dateFrom = new Date(`${Number(year)}-${month}-01 00:00:00.000`).getTime()
        let dateTo = new Date(`${Number(year)}-${month}-31 23:59:59.000`).getTime()
        let one = `http://localhost:8081/app/v1/products/get/?date_from=${dateFrom}&date_to=${dateTo}`
        let two = `http://localhost:8082/app/v1/groups/get/?date_from=${dateFrom}&date_to=${dateTo}`
        const requestOne = axios.get(one, options);
        const requestTwo = axios.get(two, options)
        axios.all([requestOne, requestTwo])
            .then(axios.spread((...responses) => {
                const responseOne = responses[0]
                const responseTwo = responses[1]
                this.props.getProducts(responseOne.data)
                this.props.getGroupsAction(responseTwo.data)
            }))
            .catch(error => {
                console.log(error)
                if (error.response.status === 401) {
                    this.props.signInClickedAction(true)
                }
            })
    }

    titleClickedHandler = () => {
        if (this.state.mode === 'products') {
            this.setState({ mode: 'groups' })
        } else {
            this.setState({ mode: 'products' })
        }
    }

    addNewGroupHandler = () => {
        this.setState({ mode: 'groups' })
        this.props.addNewGroupClicked(true)
    }

    seeAllHandler = () => {
        this.getAllProductsHandler()
         this.getAllGroupsHandler()
    }


    render() {
        var isUserLogged = localStorage.getItem('userLogged') === 'true'
        var productsLength = 0;
        var totalPrice = 0;
        var products;
        if (this.props.products) {
            products = this.props.products
            productsLength = products.length
            for (let i = 0; i < products.length; i++) {
                if (products[i].quantity >= 1) {
                    totalPrice += (products[i].quantity * Number(products[i].price))
                } else if (products[i].quantity < 1) {
                    totalPrice += Number(products[i].price)
                }
            }
        }

        var groups;
        var groupsTotalPrice = 0;
        var groupProductsLength = 0;
        if (this.props.groups) {
            groups = this.props.groups
            for (let i = 0; i < groups.length; i++) {
                groupsTotalPrice += Number(groups[i].totalPrice)
                groupProductsLength += groups.length
            }
        }


        return (
            <main className="budget-calc-main">
                <HeaderInfo totalPrice={totalPrice}
                    productsLength={productsLength}
                    getAll={this.seeAllHandler}
                    selectFilter={this.selectFilterHandler}
                    selectedMonth={this.state.selectedMonth}
                    selectedYear={this.state.selectedYear}
                    groupsTotalPrice={groupsTotalPrice}
                    groupsLength={this.props.groups.length}
                    groupsProductsNumber={groupProductsLength}
                    isMonthSelected={this.state.isMonthSelected}
                    mode={this.state.mode}
                />
                {this.props.accountClicked ? <Account /> : null}
                {this.props.signInClicked && !this.props.isUserLogged ? <SignIn /> : null}
                {this.props.addNewGroupClicked ? <NewGroup /> : null}
                {this.state.error ? <Alert accept={this.closeErrorAlert}
                    text="Please fill up every field!"
                /> : null}
                {this.props.signOutClicked ? <Alert accept={this.signOutHandler} decline={this.declineSignOutHandler}
                    text="Your are about to sign out! Are you sure?" show={true}
                /> : null}
                <div className="bc-titles-div">
                    <h1 onClick={this.titleClickedHandler}
                        className={this.state.mode === 'products' ? "content-title-active content-title" : 'content-title'}>products </h1>
                    <h1 onClick={this.titleClickedHandler}
                        className={this.state.mode === 'groups' ? "content-title-active content-title" : 'content-title'}>groups</h1>
                </div>
                {isUserLogged ? <>
                    {this.state.mode === "products" ?
                        <ProductInputs
                            handleInputValue={this.handleInputValue}
                            product={this.state.product}
                            editClicked={this.state.editClicked}
                            editProduct={this.editProductHandler}
                            saveProduct={this.saveProductHandler}
                            types={this.state.types}
                        /> : null}
                    <div className="budget-calc-content-div">
                        {this.state.mode === "products" ?
                            <Table
                                getAllProducts={this.getAllProductsHandler}
                                getFilteredProductsHandler={this.getFilteredProductsHandler}
                                productsLoaded={this.state.productsLoaded}
                                properties={this.state.properties}
                                products={this.props.products}
                                productToEdit={this.productToEditHandler}
                                handleCheckboxChange={this.handleCheckboxChange}
                                editClicked={this.state.editClicked}
                            /> : <Groups groupsLoaded={this.state.groupsLoaded}
                                getAllGroups={this.getAllGroupsHandler}
                            />}
                        <TableTools mode={this.state.mode}
                            deleteProducts={this.deleteProducts}
                            selectSort={this.selectSortHandler}
                            addNewGroupClicked={this.addNewGroupHandler}
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
        groups: state.groupsReducer.groups,
        groupsProductsNumber: state.groupsReducer.groupsProductsNumber,
        addNewGroupClicked: state.groupsReducer.addNewGroupClicked,
        accountClicked: state.userReducer.accountClicked,
        signInClicked: state.userReducer.signInClicked,
        signOutClicked: state.userReducer.signOutClicked
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: (products) => dispatch(getProducts(products)),
        getGroupsAction: (groups) => dispatch(getGroupsAction(groups)),
        saveProduct: (prod) => dispatch(saveProduct(prod)),
        productToEdit: (id) => dispatch(productToEdit(id)),
        editProduct: (prod) => dispatch(editProduct(prod)),
        sortProducts: (val) => dispatch(sortProducts(val)),
        sortGroups: (val) => dispatch(sortGroups(val)),
        signOutClickedAction: (bool) => dispatch(signOutClickedAction(bool)),
        isProductSavedAction: (bool) => dispatch(isProductSavedAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCalc)