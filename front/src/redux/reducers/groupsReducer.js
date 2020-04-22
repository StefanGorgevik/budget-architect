const initState = {
    addNewGroupClicked: false,
    groups: [],
    isGroupSaved: false,
    groupToEdit: {},
    isGroupEditClicked: false,
    groupsProductsNumber: 0
}

export function groupsReducer(state = initState, action) {
    switch (action.type) {
        case "GET_GROUPS": {
            return { ...state, groups: action.payload }
        }

        case "GET_PRODUCTS_NUMBER": {
            var groupsProductsLength = 0;
            state.groups.map(group => groupsProductsLength += group.products.length
            );
            return { ...state, groupsProductsNumber: groupsProductsLength }
        }
        case "ADD_NEW_GROUP_CLICKED": {
            return { ...state, addNewGroupClicked: action.payload }
        }
        case "SAVE_GROUP": {
            return { ...state, groups: [...state.groups, action.payload] }
        }
        case "IS_GROUP_SAVED": {
            return { ...state, isGroupSaved: action.payload }
        }
        case "DELETE_GROUP": {
            return { ...state, groups: state.groups.filter(group => group._id !== action.payload._id) }
        }
        case "SORT_GROUPS": {
            let val = action.payload
            return {
                ...state, groups: [...state.groups].sort((a, b) =>
                    (a[val] > b[val]) ? -1 : ((b[val] > a[val]) ? 1 : 0))
            }
        }
        case "GROUP_TO_EDIT": {
            return {
                ...state, groupToEdit: action.payload
            }
        }
        case "EDIT_GROUP_CLICKED": {
            return {
                ...state, isGroupEditClicked: action.payload
            }
        }
        case "EDIT_GROUP": {
            return {
                ...state, groups: state.groups.map((group) => {
                    if (group._id === action.payload._id) {
                        return {
                            ...group,
                            ...action.payload
                        }
                    } else {
                        return group
                    }
                })
            }
        }
        default:
            return state;
    }
}