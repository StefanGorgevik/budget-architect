import React from 'react'
import './GroupsTable.css'
import Button from '../../Button/Button'
import Loading from '../../Loading/Loading'
import { connect } from 'react-redux'
import { getGroupsAction, isGroupSavedAction } from '../../../../redux/actions/groupsActions'
import axios from 'axios'
const URL = 'http://localhost:8082/'
class GroupsTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groupsLoaded: false,
        }
    }

    componentDidUpdate() {
        if (this.props.isGroupSaved) {
            this.getAllGroupsHandler()
            this.props.isGroupSavedAction(false)
        }
    }

    componentDidMount() {
        this.getAllGroupsHandler()
    }

    getAllGroupsHandler = () => {
        axios.get(URL + 'app/v1/groups/get', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({ groupsLoaded: true })
                this.props.getGroupsAction(res.data)
            })
            .catch(err => {
                this.setState({ groupsLoaded: false })
                console.log(err)
            })
    }

    render() {
        console.log(this.props.groups)
        var groupsLength = 0;
        var groups = []
        if (this.props.groups) {
            groupsLength = this.props.groups.length
            groups = this.props.groups.map((group, i) => {
                return (
                    <tr key={group + i} className="group-tr">
                        <td>{group.date.toString().slice(0, 10)}</td>
                        <td>{group.totalPrice}</td>
                        <td id="edit-td">
                            <Button click={() => this.props.selectedGroupHandler(group)}
                                content='Open'
                                name='budg-edit-btn budg-dlt-btn' />
                        </td>
                        <td id="edit-td">
                            <Button click={() => this.props.editGroupHandler(group)}
                                content='Edit'
                                name='budg-edit-btn budg-dlt-btn' />
                        </td>
                        <td id="edit-td">
                            <Button click={() => this.props.deleteGroupHandler(group)}
                                content='Delete'
                                name='budg-edit-btn budg-dlt-btn' />
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                {this.state.groupsLoaded ?
                    groupsLength !== 0 ?
                        <table className="groups-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Total Price</th>
                                    <th>Products</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups}
                            </tbody>
                        </table> : <h1 className="table-h1">No groups found. Please create a groups of products!</h1>
                    : <Loading />}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groupsReducer.groups,
        isGroupSaved: state.groupsReducer.isGroupSaved
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getGroupsAction: (groups) => dispatch(getGroupsAction(groups)),
        isGroupSavedAction: (bool) => dispatch(isGroupSavedAction(bool))
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsTable);