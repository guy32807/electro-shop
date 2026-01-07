import { apiSlice } from './apiSlice'
import { PRODUCTS_URL } from '../constants'

export const productDetailApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductDetail: builder.query({
            query: (id) => ({ url: `${PRODUCTS_URL}/${id}`, method: 'GET' }),
            providesTags: ['Product'],
        }),
        keepUnusedDataFor: 5,
    }),
})

export const { useGetProductDetailQuery } = productDetailApiSlice