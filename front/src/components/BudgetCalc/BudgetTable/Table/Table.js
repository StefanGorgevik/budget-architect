import React from 'react'
import './Table.css'
import Tbody from '../Tbody/Tbody'
import Thead from '../Thead/Thead'
import TableInfo from '../TableInfo/TableInfo'
import axios from 'axios'
import { getProducts, deleteProduct } from '../../../../redux/actions/productsActions'
import { signInClickedAction } from '../../../../redux/actions/userActions'
import { connect } from 'react-redux'
import Alert from '../../Alert/Alert'
const URL = 'http://localhost:8081/'
class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            deleteProductClicked: false,
            productToDelete: '',
            selectedMonth: 'default',
            selectedYear: '2020'
        }
    }
    componentDidMount() {
        this.getAllProductsHandler()
    }

    getAllProductsHandler = () => {
        axios.get(URL + "app/v1/products/get/?sort=date:desc",
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                this.setState({ selectedMonth: 'default' })
                this.props.getProducts(res.data)
            })
            .catch(err => { console.log(err) })
    }

    getProductsHandler = (mon, yr) => {
        var year = yr;
        var month = mon;
        month = parseInt(month) + 1
        if (month < 10) {
            month = "0" + month.toString();
        }
        let dateFrom = new Date(`${Number(year)}-${month}-01 00:00:00.000`).getTime()
        let dateTo = new Date(`${Number(year)}-${month}-31 23:59:59.000`).getTime()
        axios.get(`${URL}app/v1/products/get/?date_from=${dateFrom}&date_to=${dateTo}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then((res) => {
                this.props.getProducts(res.data)
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 401) {
                    this.props.signInClickedAction(true)
                }
            })
    }


    deleteProductClicked = (id) => {
        this.setState({ deleteProductClicked: true, productToDelete: id })
    }

    deleteProduct = () => {
        if (this.state.productToDelete) {
            var prodID = this.state.productToDelete
            axios.delete(`${URL}app/v1/products/${prodID}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then(res => {
                    this.props.deleteProduct(prodID)
                    this.setState({ deleteProductClicked: false, productToDelete: '' })
                })
                .catch(err => { console.log(err) })
        }
    }

    closeAlert = () => {
        this.setState({ deleteProductClicked: false })
    }

    selectFilterHandler = (event) => {
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
        } else if (event.target.value !== 'default') {
            this.getProductsHandler(month, year)
        }

    }

    render() {
        var productsLengths = 0;
        var totPrice = 0;
        var products;
        if (this.props.products) {
            products = this.props.products
            productsLengths = products.length
            for (var i = 0; i < products.length; i++) {
                if (products[i].quantity >= 1) {
                    totPrice += (products[i].quantity * Number(products[i].price))
                } else if (products[i].quantity < 1) {
                    totPrice += Number(products[i].price)
                }

            }
        }
        return (
            <div className="table-div">
                {this.state.deleteProductClicked ? <Alert accept={this.deleteProduct} decline={this.closeAlert}
                    text="You are about to delete several items. Are you sure?" show={true} /> : null}
                <h1>Products</h1>
                <TableInfo totalPrice={totPrice}
                    productsLength={productsLengths}
                    selectModeHandler={this.props.selectModeHandler}
                    selectedMonth={this.state.selectedMonth}
                    selectFilterHandler={this.selectFilterHandler}
                    getAllProducts={this.getAllProductsHandler}
                />
                {productsLengths !== 0 ? <>
                    <Thead properties={this.props.properties} />
                    <div className="products-div">
                        <table className="budg-table">
                            <Tbody products={this.props.products}
                                productToEdit={this.props.productToEdit}
                                productToDelete={this.deleteProductClicked}
                                handleCheckboxChange={this.props.handleCheckboxChange}
                                editClicked={this.props.editClicked}
                            />
                        </table>
                    </div>
                </> : <h1 className="table-h1">No products found. Please create a product!</h1>}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: (products) => dispatch(getProducts(products)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool))
    }
}

export default connect(null, mapDispatchToProps)(Table)