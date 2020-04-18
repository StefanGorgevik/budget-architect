import {createStore, combineReducers} from 'redux'
import {userReducer} from './reducers/userReducer'
import { productsReducer} from './reducers/productsReducer'
import { groupsReducer} from './reducers/groupsReducer'

const reducer = combineReducers({
    userReducer,
    productsReducer,
    groupsReducer
})

const store = createStore(reducer)

export default store;