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
class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            deleteProductClicked: false,
            productToDelete: ''
        }
    }
    componentDidMount() {
        var id = localStorage.getItem('user-id')
        axios.get(`http://localhost:8081/app/v1/products/get/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then((res) => {
                console.log(res)
                this.props.getProducts(res.data)
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 401) {
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
            axios.delete(`http://localhost:8081/app/v1/products/${prodID}`,
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

    render() {
        var productsLengths = 0;
        if (this.props.products) {
            productsLengths = this.props.products.length
        }
        return (
            <div className="table-div">
                {this.state.deleteProductClicked ? <Alert accept={this.deleteProduct} decline={this.closeAlert}
                    text="You are about to delete several items. Are you sure?" show={true} /> : null}
                <h1>Products</h1>
                <TableInfo totalPrice={this.props.totalPrice}
                    productsLength={productsLengths}
                    selectModeHandler={this.props.selectModeHandler}
                />
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