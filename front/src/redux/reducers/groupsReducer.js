const initState = {
    addNewGroupClicked: false,
    mode: 'products',
    productGroups: []
}

export function groupsReducer(state = initState, action) {
    switch (action.type) {
        case "ADD_NEW_GROUP_CLICKED": {
            return { ...state, addNewGroupClicked: action.payload }
        }
        case "CHANGE_MODE": {
            return { ...state, mode: action.payload }
        }
        case "SAVE_GROUP": {
            return { ...state, productGroups: [...state.productGroups, action.payload] }
        }
        case "DELETE_GROUP": {
            return { ...state, productGroups: state.productGroups.filter(group => group.id !== action.payload.id) }
        }
        case "SORT_GROUPS": {
            let val = action.payload
            return {
                ...state, productGroups: [...state.productGroups].sort((a, b) =>
                    (a[val] > b[val]) ? 1 : ((b[val] > a[val]) ? -1 : 0))
            }
        }
        
        default:
            return state;
    }
}