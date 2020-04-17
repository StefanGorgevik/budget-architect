import {createStore, combineReducers} from 'redux'
import {userReducer} from './reducers/userReducer'
import { productsReducer} from './reducers/productsReducer'

const reducer = combineReducers({
    userReducer,
    productsReducer
})

const store = createStore(reducer)

export default store;