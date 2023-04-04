import { createSlice } from "@reduxjs/toolkit"

interface IdropSlice {
    dropState: [],
    currentBoard: {
        id: number
        items: []
    },
    currentItem: {
        id: number
    }
    disabledDrop: boolean
    hugState: boolean
}


const initialState = ({
    dropState: [],
    currentBoard: {
        id: 0,
        items: []
    },
    currentItem: {
        id: 0,
    },
    disabledDrop: false,
    hugState: false
}) as IdropSlice;


const dropStore = createSlice({
    name: 'db',
    initialState,
    reducers: {
        setDropState: (state, action) => {
            state.dropState = action.payload;
        },
        setCurrentBoard: (state, action) => {
            state.currentBoard = action.payload
        },
        setCurrentItem: (state, action) => {
            state.currentItem = action.payload
        },
        setDisabledDrop: (state, action) => {
            state.disabledDrop = action.payload
        },
        setHugState: (state, action) => {
            state.hugState = action.payload
        }
    }
});
export const {
    setDropState,
    setCurrentBoard,
    setCurrentItem,
    setDisabledDrop,
    setHugState } = dropStore.actions;

export default dropStore.reducer;