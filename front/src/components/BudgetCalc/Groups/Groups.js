import React from 'react'
import './Groups.css'
import { connect } from 'react-redux'
import Selected from './Selected/Selected'
import Button from '../Button/Button'
import GroupsTable from './GroupsTable/GroupsTable'
import { addNewGroupClicked, deleteGroup, groupToEditAction, editGroupClickedAction } from '../../../redux/actions/groupsActions'
import Alert from '../Alert/Alert'
import axios from 'axios'
const URL = 'http://localhost:8082/'
class Groups extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGroup: [],
            selectedProducts: [],
            groupSelected: false,
            deleteClicked: false,
            groupToDelete: null,
            addNewGroupClicked: false
        }
    }

    selectedGroupHandler = (group) => {
        this.setState({ selectedGroup: group, selectedProducts: group.products, groupSelected: true })
    }

    addNewGroupHandler = () => {
        this.props.addNewGroupClicked(!this.state.addNewGroupClicked)
    }

    deleteGroupHandler = (group) => {
        this.setState({ groupToDelete: group, deleteClicked: true })
    }

    acceptDelete = () => {
        axios.delete(`${URL}app/v1/groups/${this.state.groupToDelete._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.props.deleteGroup(this.state.groupToDelete)
                this.setState({ deleteClicked: false, selected: [] })
            })
            .catch(err => {
                console.log(err)
            })
    }

    closeAlert = () => {
        this.setState({ deleteClicked: false })
    }

    closeSelectedGroupHandler = () => {
        this.setState({ groupSelected: false })
    }

    editGroupHandler = (group) => {
        this.props.groupToEditAction(group)
        this.props.editGroupClickedAction(true)
        this.props.addNewGroupClicked(true)
        this.setState({ groupSelected: false})
    }

    render() {
        if (this.state.selectedProducts) {
            var prods = this.state.selectedProducts
            var  productsTotalPrice = 0
            for (let i = 0; i < prods.length; i++) {
                if (prods[i].quantity > 1) {
                    productsTotalPrice += (prods[i].quantity * Number(prods[i].price))
                } else if (prods[i].quantity < 2) {
                    productsTotalPrice += Number(prods[i].price)
                }
            }
        }
        
        return (
            <main className="groups-main">
                {this.state.deleteClicked ? <Alert accept={this.acceptDelete} decline={this.closeAlert}
                    text="You are about to delete a group of products. Are you sure?" show={true}
                /> : null}
                {this.state.groupSelected ?
                    <Selected products={this.state.selectedProducts}
                        selectedGroup={this.state.selectedGroup}
                        totalPrice={productsTotalPrice}
                        addNewGroupHandler={this.addNewGroupHandler}
                        closeSelectedGroup={this.closeSelectedGroupHandler}
                        editGroup={this.editGroupHandler}
                    /> : null}
                <Button click={this.addNewGroupHandler}
                    content='Add a new group of products'
                    name='table-tools-btn add-group-btn' />
                <div className="groups-content">
                    <div className="groups-div">
                        <GroupsTable groups={this.props.groups}
                            selectedGroupHandler={this.selectedGroupHandler}
                            deleteGroupHandler={this.deleteGroupHandler}
                            editGroupHandler={this.editGroupHandler}
                            totalPrice={productsTotalPrice}
                            groupsLoaded={this.props.groupsLoaded}
                            getAllGroups={this.props.getAllGroups}
                        />
                    </div>
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groupsReducer.groups
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewGroupClicked: (bool) => dispatch(addNewGroupClicked(bool)),
        deleteGroup: (group) => dispatch(deleteGroup(group)),
        groupToEditAction: (group) => dispatch(groupToEditAction(group)),
        editGroupClickedAction: (bool) => dispatch(editGroupClickedAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)