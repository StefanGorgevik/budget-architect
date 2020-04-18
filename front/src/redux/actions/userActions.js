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

export function signOutClickedAction(bool) {
    return {
        type: "SIGN_OUT_CLICKED",
        payload: bool
    }
}

export function editUserInfo(user) {
    return {
        type: "EDIT_USER_INFO",
        payload: user
    }
}