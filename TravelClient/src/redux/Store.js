import { configureStore } from '@reduxjs/toolkit'
import apiReducer from './slice/apiSlice'

export const store = configureStore({
    reducer: {

        api: apiReducer,

    },
})  