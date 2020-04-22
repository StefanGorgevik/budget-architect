import React from 'react'
import './TableTools.css'
import { addNewGroupClicked } from '../../../redux/actions/groupsActions'
import ToolsContent from './ToolsContent/ToolsContent'
import {connect} from 'react-redux'

class TableTools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false
        }
    }

    handleHover = () => {
        this.setState({ hovered: true })
    }

    handleHoverLeave = () => {
        this.setState({ hovered: false })
    }   

    render() {
        return (
            <>
                <div className={this.state.hovered ? "table-tools-div table-tools-div-active" : "table-tools-div"}
                    onMouseEnter={this.handleHover}
                    onMouseLeave={this.handleHoverLeave} >
                    {this.state.hovered ?
                        <ToolsContent 
                            selectSort={this.props.selectSort}
                            addNewGroupClicked={this.props.addNewGroupClicked}
                            mode={this.props.mode}
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
        addNewGroupClicked: (bool) => dispatch(addNewGroupClicked(bool))
    }
}


export default connect(null, mapDispatchToProps)(TableTools);