import React from 'react'
import './Table.css'
import Tbody from '../Tbody/Tbody'
import Thead from '../Thead/Thead'
import axios from 'axios'
import { getProducts, deleteProduct, isProductSavedAction } from '../../../../redux/actions/productsActions'
import { signInClickedAction } from '../../../../redux/actions/userActions'
import { connect } from 'react-redux'
import Alert from '../../Alert/Alert'
import Loading from '../../Loading/Loading'
const URL = 'http://localhost:8081/'
class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            deleteProductClicked: false,
            productToDelete: ''
        }
    }
    componentDidUpdate() {
        if (this.props.isProductSaved) {
            this.props.getAllProducts()
            this.props.isProductSavedAction(false)
        }
    }
    componentDidMount() {
        this.props.getAllProducts()
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

    render() {
        return (
            <div className="table-div">
                {this.state.deleteProductClicked ? <Alert accept={this.deleteProduct} decline={this.closeAlert}
                    text="You are about to delete several items. Are you sure?" show={true} /> : null}
                {this.props.productsLoaded ? 
                    this.props.products.length !== 0 ? <>
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
                </> :
                <h1 className="table-h1">No products found. Please create a product!</h1>
                : <Loading/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isProductSaved: state.productsReducer.isProductSaved
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getProducts: (products) => dispatch(getProducts(products)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        signInClickedAction: (bool) => dispatch(signInClickedAction(bool)),
        isProductSavedAction: (bool) => dispatch(isProductSavedAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)