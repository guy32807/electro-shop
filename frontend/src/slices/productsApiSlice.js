import { apiSlice } from './apiSlice'
import { PRODUCTS_URL } from '../constants'

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({    
            query: () => ({ url: PRODUCTS_URL, method: 'GET' }),
            providesTags: ['Product'],
        }),
        keepUnusedDataFor: 5,
    }),
});

export const { useGetProductsQuery } = productsApiSlice;