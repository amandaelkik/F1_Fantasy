import { configureStore } from '@reduxjs/toolkit'
import teamsReducer from './teamsSlice'

const store = configureStore({ reducer: { teams: teamsReducer } })
export default store
