export function addNewGroupClicked(clicked) {
    return {
        type: "ADD_NEW_GROUP_CLICKED",
        payload: clicked
    }
}
export function changeMode(mode) {
    return {
        type: "CHANGE_MODE",
        payload: mode
    }
}

export function saveGroup(group) {
    return {
        type: "SAVE_GROUP",
        payload: group
    }
}

export function deleteGroup(group) {
    return {
        type: "DELETE_GROUP",
        payload: group
    }
}

export function sortGroups(val) {
    return {
        type: "SORT_GROUPS",
        payload: val
    }
}