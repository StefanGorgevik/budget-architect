import React from 'react'
import './Groups.css'
import { connect } from 'react-redux'
import Selected from './Selected/Selected'
import Button from '../Button/Button'
import GroupsTable from './GroupsTable/GroupsTable'
import store from '../../../redux/store'
import { addNewGroupClicked, deleteGroup } from '../../../redux/actions/actions'

class Groups extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            groupsToDelete: []
        }
    }

    selectedGroupHandler = (group) => {
        this.setState({ selected: group.products })
    }

    addNewGroupHandler = () => {
        store.dispatch(addNewGroupClicked(!this.state.addNewGroupClicked))
    }

    deleteGroupHandler = (group) => {
        store.dispatch(deleteGroup(group))
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
        groups: state.productGroups
    }
}

export default connect(mapStateToProps)(Groups)