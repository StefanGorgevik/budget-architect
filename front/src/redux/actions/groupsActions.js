export function getGroupsAction(groups) {
    return {
        type: "GET_GROUPS",
        payload: groups
    }
}

export function addNewGroupClicked(clicked) {
    return {
        type: "ADD_NEW_GROUP_CLICKED",
        payload: clicked
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

export function isGroupSavedAction(bool) {
    return {
        type: "IS_GROUP_SAVED",
        payload: bool
    }
}

export function groupToEditAction(group) {
    return {
        type: "GROUP_TO_EDIT",
        payload: group
    }
}
export function editGroupClickedAction(bool) {
    return {
        type: "EDIT_GROUP_CLICKED",
        payload: bool
    }
}

export function editGroupAction(group) {
    return {
        type: "EDIT_GROUP",
        payload: group
    }
}


