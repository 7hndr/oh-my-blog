import {
	combineReducers,
	configureStore
	// applyMiddleware,
	// compose
} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import authReducer from '../../features/Auth/store/authSlice.js'

const reducer = combineReducers({ auth: authReducer })

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// composeEnhancers(applyMiddleware(thunk))
export default configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
	devTools: import.meta.env.NODE_ENV !== 'production'
})
