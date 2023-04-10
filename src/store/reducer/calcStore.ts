import { createSlice } from '@reduxjs/toolkit';

export interface UserSliceInterface {
    result: number | string
    calcResult: number
    saveResalt: number
    firstNumbers: string
    secondNumbers: string
    operation: string
    calcArr: []
    toggle: boolean
    incr: number
    summary: number
}


const initialState = ({
    result: 0,
    calcResult: 0,
    saveResalt: 0,
    firstNumbers: "",
    secondNumbers: "",
    operation: "",
    calcArr: [],
    toggle: false,
    incr: 0,
    summary: 0,
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
            state.incr += 1
        },
        setCalcArr: (state, action) => {
            if (action.payload) {
                (state.calcArr as any).push(action.payload)
            }
        },
        setClearArr: (state, action) => {
            state.calcArr = action.payload
        },
        setToggle: (state, action) => {
            // if (action.payload === true) {
            //     state.toggle = false
            // } else if (action.payload === false) {
            //     state.toggle = true
            // }
            state.toggle = action.payload
        },
        setSummary: (state, action) => {
            state.summary = action.payload
        }
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
    setCalcArr,
    setClearArr,
    setToggle,
    setSummary
} = calcStore.actions;


export default calcStore.reducer;