import React from 'react'
import './Table.css'
import Tbody from '../Tbody/Tbody'
import Thead from '../Thead/Thead'
import TableInfo from '../TableInfo/TableInfo'
import axios from 'axios'
import {getProducts} from '../../../../redux/actions/productsActions'
import {connect} from 'react-redux'
class Table extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            products: []
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
                .catch(err => {
                    console.log(err)
                })
            }
    
    render() {
    var productsLengths = 0;
    if(this.props.products) {
        productsLengths = this.props.products.length
    }
    return (
        <div className="table-div">
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
        getProducts: (products) => dispatch(getProducts(products))
    }
}

export default connect(null, mapDispatchToProps)(Table)