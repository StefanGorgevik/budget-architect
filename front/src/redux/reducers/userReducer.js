const initState = {
    signInClicked: false,
    accountClicked: false,
    signOutClicked: false,
    userToEdit: {}
}

export function userReducer(state = initState, action) {
    switch (action.type) {
        case "SIGN_IN_CLICKED": {
            return {
                ...state,  signInClicked: action.payload}
        }
        case "SIGN_OUT_CLICKED": {
            return {
                ...state,  signOutClicked: action.payload}
        }
        case "ACCOUNT_CLICKED": {
            return {
                ...state,  accountClicked: action.payload}
        }
        case "EDIT_USER_INFO": {
            return {
                ...state,  userToEdit: action.payload}
        }
        default:
            return state;
    }
}