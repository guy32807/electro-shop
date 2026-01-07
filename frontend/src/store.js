import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
//import productListReducer from './reducers/productListReducer'

const store = configureStore({
    reducer: {
            //productList: productListReducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store