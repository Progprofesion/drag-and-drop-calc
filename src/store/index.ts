import { configureStore } from '@reduxjs/toolkit';

import calcStore from './reducer/calcStore';
import dropStore from "./reducer/dropStore";
import { apiSlice } from '../components/api/apiSlice';

const store = configureStore({
    reducer: {
        calcStore, dropStore,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

// const store = configureStore({
//     reducer: {
//         calcStore,
//     },
//     middleware: getDefaultMiddleware => getDefaultMiddleware({
//         serializableCheck: false,
//     }),
//     devTools: process.env.NODE_ENV !== 'production'
// });

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;