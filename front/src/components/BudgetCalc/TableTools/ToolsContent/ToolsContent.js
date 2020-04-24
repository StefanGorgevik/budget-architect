import React from 'react'
import './ToolsContent.css'
import Button from '../../Button/Button'
import SelectSort from '../SelectSort/SelectSort'

function ToolsContent(props) {
    return (
        <div className="table-tools-content">
            <div className="filter-div">
                <SelectSort selectSort={props.selectSort}
                    sorts={props.sorts}
                    mode={props.mode}
                />
            </div>
            <Button click={props.addNewGroupClicked}
                content='Add a new group'
                name='table-tools-btn' />
        </div>
    )
}

export default ToolsContent;