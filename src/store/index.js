/* eslint-disable import/prefer-default-export */
import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import filterSlice from './filterSlice'
import dataSlice from './dataSlice'

const middleware = (store) => (next) => (action) => {
  const result = next(action)
  console.log('Middleware', store.getState())
  return result
}

export const store = configureStore(
  {
    reducer: {
      filter: filterSlice,
      data: dataSlice,
    },
  },
  applyMiddleware(middleware, thunk)
)
