import { configureStore } from '@reduxjs/toolkit';

import reducerDb from './reducer/reducerDb';

const store = configureStore({
    reducer: {
        reducerDb,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;