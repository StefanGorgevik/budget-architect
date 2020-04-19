const initState = {
    addNewGroupClicked: false,
    mode: 'products',
    groups: []
}

export function groupsReducer(state = initState, action) {
    switch (action.type) {
        case "GET_GROUPS": {
            return { ...state, groups: action.payload }
        }
        case "ADD_NEW_GROUP_CLICKED": {
            return { ...state, addNewGroupClicked: action.payload }
        }
        case "CHANGE_MODE": {
            return { ...state, mode: action.payload }
        }
        case "SAVE_GROUP": {
            return { ...state, groups: [...state.groups, action.payload] }
        }
        case "DELETE_GROUP": {
            return { ...state, groups: state.groups.filter(group => group._id !== action.payload._id) }
        }
        case "SORT_GROUPS": {
            let val = action.payload
            console.log(val)
            return {
                ...state, groups: [...state.groups].sort((a, b) =>
                    (a[val] > b[val]) ? 1 : ((b[val] > a[val]) ? -1 : 0))
            }
        }
        default:
            return state;
    }
}