import React from 'react'
import './GroupsTable.css'
import Button from '../../Button/Button'

function GroupsTable (props) {
        var groups = props.groups.map((group, i) => {
            return (
                <tr key={group + i} className="group-tr">
                    <td>{group.groupDate}</td>
                    <td>{group.type}</td>
                    <td>{group.groupTotalPrice}</td>
                    <td onClick={() => props.selectedGroupHandler(group)} className="expand-td">
                        <span>Open</span>  <i className="fas fa-long-arrow-alt-right"></i>
                    </td>
                    <td id="edit-td">
                        <Button click={() => props.deleteGroupHandler(group)}
                            content='Delete'
                            name='budg-edit-btn budg-dlt-btn' />
                    </td>
                </tr>
            )
        })
        return (
            <div>
                <table className="groups-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
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

export default GroupsTable;