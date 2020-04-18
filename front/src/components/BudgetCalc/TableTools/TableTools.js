import React from 'react'
import './TableTools.css'
import { addNewGroupClicked, changeMode } from '../../../redux/actions/groupsActions'
import ToolsContent from './ToolsContent/ToolsContent'
import {connect} from 'react-redux'

class TableTools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false,
            sorts: ["name", "type", "price", "quantity", "date"],
            addNewGroupClicked: false
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
        this.props.addNewGroupClicked(!this.state.addNewGroupClicked)
        this.props.changeMode('groups')
    }

    selectModeHandler = (event) => {
        this.props.changeMode(event.target.value)
    }

    render() {
        return (
            <>
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

function mapDispatchToProps(dispatch) {
    return {
        addNewGroupClicked: (bool) => dispatch(addNewGroupClicked(bool)),
        changeMode: (mode) => dispatch(changeMode(mode))
    }
}


export default connect(null, mapDispatchToProps)(TableTools);