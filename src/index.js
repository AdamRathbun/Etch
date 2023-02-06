import React from 'react'
import {createRoot} from 'react-dom/client'
// Provider tracks the store, which is the global state. can access the store from anywhere inside the app
import {Provider} from 'react-redux'
//note "configureStore" has replaced createStore in most current
// import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux'
// import thunk from 'redux-thunk'
import { configureStore } from "@reduxjs/toolkit";


import reducers from './reducers'

import App from './App';
import './index.css'

// const store = createStore(reducers, compose(applyMiddleware(thunk)))
const store = configureStore({ reducer: reducers })


createRoot(document.getElementById('root')).render(
    //wrapping App component in a provider. specifying store to equal store from ln 13. 
    <Provider store={store}>
        <App />
    </Provider>,
)
