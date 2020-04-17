const initState = {
    signInClicked: true,
    accountClicked: false,
    isUserLogged: false,
    userToEdit: {}
}

export function userReducer(state = initState, action) {
    switch (action.type) {
        case "SIGN_IN_CLICKED": {
            return {
                ...state,  signInClicked: action.payload}
        }
        case "ACCOUNT_CLICKED": {
            return {
                ...state,  accountClicked: action.payload}
        }
        case "USER_LOGGED_IN": {
            return {
                ...state,  isUserLogged: action.payload}
        }
        case "EDIT_USER_INFO": {
            return {
                ...state,  userToEdit: action.payload}
        }
        default:
            return state;
    }
}