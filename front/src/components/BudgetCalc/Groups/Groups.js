import React from 'react'
import './Groups.css'
import { connect } from 'react-redux'
import Selected from './Selected/Selected'
import Button from '../Button/Button'
import GroupsTable from './GroupsTable/GroupsTable'
import { addNewGroupClicked, deleteGroup } from '../../../redux/actions/groupsActions'
import Alert from '../Alert/Alert'
import axios from 'axios'
const URL = 'http://localhost:8082/'
class Groups extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            groupsToDelete: [],
            deleteClicked: false,
            groupToDelete: null
        }
    }

    selectedGroupHandler = (group) => {
        this.setState({ selected: group.products })
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
                this.setState({ deleteClicked: false })
            })
            .catch(err => {
                console.log(err)
            })
    }

    closeAlert = () => {
        this.setState({ deleteClicked: false })
    }

    render() {
        var selectedGroup = this.state.selected
        var totalPrice = 0
        for (var i = 0; i < selectedGroup.length; i++) {
            if (selectedGroup[i].quantity > 1) {
                totalPrice += (selectedGroup[i].quantity * Number(selectedGroup[i].price))
            } else if (selectedGroup[i].quantity < 2) {
                totalPrice += Number(selectedGroup[i].price)
            }
        }
        return (
            <main className="groups-main">
                {this.state.deleteClicked ? <Alert accept={this.acceptDelete} decline={this.closeAlert}
                    text="You are about to delete a group of products. Are you sure?"
                /> : null}
                <h1>Groups</h1>
                <div className="groups-content">
                    <div className="groups-div">
                        <GroupsTable groups={this.props.groups}
                            selectedGroupHandler={this.selectedGroupHandler}
                            deleteGroupHandler={this.deleteGroupHandler}
                            editGroupHandler={this.editGroupHandler}
                            totalPrice={totalPrice}
                        />
                    </div>
                    <div className="groups-right-div">
                        <Button click={this.addNewGroupHandler}
                            content='Add a new group of products'
                            name='table-tools-btn' />
                        <Selected products={this.state.selected}
                            totalPrice={totalPrice}
                            addNewGroupHandler={this.addNewGroupHandler}
                        />
                    </div>
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groupsReducer.productGroups
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewGroupClicked: (bool) => dispatch(addNewGroupClicked(bool)),
        deleteGroup: (group) => dispatch(deleteGroup(group))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)