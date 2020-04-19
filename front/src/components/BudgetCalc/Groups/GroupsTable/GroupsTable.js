import React from 'react'
import './GroupsTable.css'
import Button from '../../Button/Button'
import {connect } from 'react-redux'
import {getGroupsAction} from '../../../../redux/actions/groupsActions'
import axios from 'axios'
const URL = 'http://localhost:8082/'
class GroupsTable extends React.Component {
    componentDidMount() {
        axios.get(URL + 'app/v1/groups/get', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => {
            console.log(res)
            this.props.getGroupsAction(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        var groups = []
        if (this.props.groups) {
            groups = this.props.groups.map((group, i) => {
                return (
                    <tr key={group + i} className="group-tr">
                        <td>{group.date.toString().slice(0, 10)}</td>
                        <td>{group.totalPrice}</td>
                        <td onClick={() => this.props.selectedGroupHandler(group)} className="expand-td">
                            <span>Open</span>  <i className="fas fa-long-arrow-alt-right"></i>
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
                <table className="groups-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Products</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups}
                    </tbody>
                </table>
            </div>
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
        getGroupsAction: (groups) => dispatch(getGroupsAction(groups))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsTable);