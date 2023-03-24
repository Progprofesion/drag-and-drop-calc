import { configureStore } from '@reduxjs/toolkit';

import calcStore from './reducer/calcStore';

const store = configureStore({
    reducer: {
        calcStore,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;