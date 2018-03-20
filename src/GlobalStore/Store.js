import { combineReducers, createStore, applyMiddleware } from 'redux'

import thunk  from 'redux-thunk'
import logger from 'redux-logger'

import { auth, initialState as authStore } from '../reducers/authReducer'
import { game, initialState as gameStore } from '../reducers/gameReducer'

// Combine all reducers
const reducers = combineReducers({
    auth,
    game
})

// Create a middleware to wraps an data to delay its evaluation
const middlewares = [thunk]

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
}

// Apply middelwares
const enhancer = applyMiddleware(...middlewares)

// Define Global Store
const GlobalStore = {
            auth: authStore,
            game: gameStore
          }

// Create the Store
let Store = createStore(reducers, GlobalStore, enhancer)

export default Store