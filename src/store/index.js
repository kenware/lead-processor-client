import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userSlice from './user/reducer'
import leadSlice from './lead/reducer'

const reducer = combineReducers({
  user: userSlice.reducer,
  lead: leadSlice.reducer
})

const store = configureStore({
  reducer
})
export default store
