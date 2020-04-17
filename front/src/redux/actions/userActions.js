export function accountClickedAction(bool) {
    return {
        type: "ACCOUNT_CLICKED",
        payload: bool
    }
}
export function signInClickedAction(bool) {
    return {
        type: "SIGN_IN_CLICKED",
        payload: bool
    }
}

export function userLoggedIn(bool) {
    return {
        type: "USER_LOGGED_IN",
        payload: bool
    }
}

export function editUserInfo(user) {
    return {
        type: "EDIT_USER_INFO",
        payload: user
    }
}