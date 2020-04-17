import React from 'react'
import './TableTools.css'
import store from '../../../redux/store'
import { addNewGroupClicked, changeMode, deleteProducts } from '../../../redux/actions/actions'
import { connect } from 'react-redux'
import ToolsContent from './ToolsContent/ToolsContent'
import Alert from '../Alert/Alert'

class TableTools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false,
            sorts: ["name", "type", "price", "quantity", "date"],
            addNewGroupClicked: false,
            deleteProducts: false
        }
    }

    handleInputValue = (e) => {
        this.setState({ addedType: e.target.value })
    }

    handleHover = () => {
        this.setState({ hovered: true })
    }

    handleHoverLeave = () => {
        this.setState({ hovered: false })
    }   

    addNewGroupHandler = () => {
        store.dispatch(addNewGroupClicked(!this.state.addNewGroupClicked))
        store.dispatch(changeMode('groups'))
    }

    selectModeHandler = (event) => {
        store.dispatch(changeMode(event.target.value))
    }

    deleteProductsClicked = () => {
        this.setState({ deleteProducts: true })
    }

    deleteProducts = () => {
        store.dispatch(deleteProducts())
        this.setState({ deleteProducts: false })
    }
    
    closeAlert = () => {
        this.setState({ deleteProducts: false })
    }

    render() {
        return (
            <>
                {this.state.deleteProducts ? <Alert accept={this.deleteProducts} decline={this.closeAlert}
                    text="You are about to delete several items. Are you sure?" /> : null}
                <div className={this.state.hovered ? "table-tools-div table-tools-div-active" : "table-tools-div"}
                    onMouseEnter={this.handleHover}
                    onMouseLeave={this.handleHoverLeave} >
                    {this.state.hovered ?
                        <ToolsContent deleteProductsClicked={this.deleteProductsClicked}
                            totalPrice={this.props.totalPrice}
                            selectFilterHandler={this.props.selectFilterHandler}
                            handleInputValue={this.handleInputValue}
                            addTypeHandler={this.addTypeHandler}
                            addTypeClickedHandler={this.addTypeClickedHandler}
                            addTypeClicked={this.state.addTypeClicked}
                            sorts={this.state.sorts}
                            addNewGroupHandler={this.addNewGroupHandler}
                            selectModeHandler={this.selectModeHandler}
                        />
                        :
                        <div className="before-hover-div">
                            <p><i className="fas fa-tools"></i></p>
                        </div>
                    }
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        types: state.budgetCalcTypes
    }
}

export default connect(mapStateToProps)(TableTools);