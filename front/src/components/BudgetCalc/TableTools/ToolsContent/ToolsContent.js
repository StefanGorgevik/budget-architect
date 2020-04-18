import React from 'react'
import './ToolsContent.css'
import Button from '../../Button/Button'
import SelectMode from '../SelectMode/SelectMode'
import SelectSort from '../SelectSort/SelectSort'

function ToolsContent(props) {
    return (
        <div className="table-tools-content">
            <h1>Tools</h1>
            <div className="filter-div">
                <SelectMode selectModeHandler={props.selectModeHandler} />
                <SelectSort selectFilterHandler={props.selectFilterHandler}
                    sorts={props.sorts} />
            </div>
            <Button click={props.addNewGroupHandler}
                content='Add a new group of products'
                name='table-tools-btn' />
        </div>
    )
}

export default ToolsContent;