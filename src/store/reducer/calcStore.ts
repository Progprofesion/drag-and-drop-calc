import { createSlice } from '@reduxjs/toolkit';

export interface UserSliceInterface {
    calcResult: number
    firstNumbers: string
    secondNumbers: string
    operation: string
}


const initialState = ({
    calcResult: 0,
    firstNumbers: "",
    secondNumbers: "",
    operation: ""

}) as UserSliceInterface

const calcStore = createSlice({
    name: 'calc',
    initialState,
    reducers: {
        setCalcResult: (state, action) => {
            state.calcResult = action.payload
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
        }
    }
});

export const {
    setCalcResult,
    setFirstNumber,
    setSecondNumber,
    setClearSecondNumbers,
    setClearFirstNumbers,
    setOperation,
} = calcStore.actions;

// export const { selectAll } = cardsAdapter.getSelectors((state: TgetSelector) => state.db)

export default calcStore.reducer;