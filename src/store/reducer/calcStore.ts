import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export interface UserSliceInterface {
    calckState: number
}

const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState({
    calckState: 0

}) as UserSliceInterface

const calcStore = createSlice({
    name: 'db',
    initialState,
    reducers: {
        setCalckState: (state, action) => {
            state.calckState = action.payload
        }
    }
});

export const { setCalckState } = calcStore.actions;

export const { selectAll } = cardsAdapter.getSelectors((state: any) => state.storage)

export default calcStore.reducer;