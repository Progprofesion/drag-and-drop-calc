import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://my-json-server.typicode.com/Progprofesion/test-task-sy' }),
    tagTypes: ['dropDb'],
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/dropDb',
            providesTags: ['dropDb']
        }),
        getProductsId: builder.query({
            query: (id) => `/dropDb/${id}`
        })
    })
});



export const { useGetProductsQuery, useGetProductsIdQuery } = apiSlice;