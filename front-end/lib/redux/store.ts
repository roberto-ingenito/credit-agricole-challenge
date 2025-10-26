import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice"
import jobOffersReducer from './slices/jobOffersSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        jobOffers: jobOffersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store