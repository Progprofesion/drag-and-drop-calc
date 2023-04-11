import { createSlice } from '@reduxjs/toolkit';

export interface UserSliceInterface {
    result: number | string
    calcResult: number
    saveResalt: number
    firstNumbers: string
    secondNumbers: string
    operation: string
}


const initialState = ({
    result: 0,
    calcResult: 0,
    saveResalt: 0,
    firstNumbers: "",
    secondNumbers: "",
    operation: "",
}) as UserSliceInterface

const calcStore = createSlice({
    name: 'calc',
    initialState,
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload
        },
        setCalcResult: (state, action) => {
            state.calcResult = action.payload
        },
        setSaveResalt: (state, action) => {
            state.saveResalt = action.payload
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
        setOperation: (state, action) => {
            state.operation = action.payload
        },
    }
});

export const {
    setResult,
    setCalcResult,
    setSaveResalt,
    setFirstNumber,
    setSecondNumber,
    setClearSecondNumbers,
    setClearFirstNumbers,
    setOperation,
} = calcStore.actions;

// export const { selectAll } = cardsAdapter.getSelectors((state: TgetSelector) => state.db)

export default calcStore.reducer;