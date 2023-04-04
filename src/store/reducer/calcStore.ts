import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export interface UserSliceInterface {
    calckResult: number
    firstNumbers: string
    secondNumbers: string
    // clearSecondNumbers: any
}

const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState({
    calckResult: 0,
    firstNumbers: "",
    secondNumbers: "",
    // clearSecondNumbers: "",

}) as UserSliceInterface

const calcStore = createSlice({
    name: 'db',
    initialState,
    reducers: {
        setCalckResult: (state, action) => {
            state.calckResult = action.payload
        },
        setFirstNumber: (state, action) => {
            state.firstNumbers += action.payload
        },
        setSecondNumber: (state, action) => {
            state.secondNumbers += action.payload
        },
        setClearFirstNumbers: (state, action) => {
            state.firstNumbers = action.payload
        },
        setClearSecondNumbers: (state, action) => {
            state.secondNumbers = action.payload
        },
    }
});

export const {
    setCalckResult,
    setFirstNumber,
    setSecondNumber,
    setClearSecondNumbers,
    setClearFirstNumbers,
} = calcStore.actions;

export const { selectAll } = cardsAdapter.getSelectors((state: any) => state.storage)

export default calcStore.reducer;