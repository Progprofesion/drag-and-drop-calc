import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export interface UserSliceInterface {
    stateDb: any
    setDb?: any;
    currentBoard: any
    currentItem?: any
}

const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState({
    currentBoard: [],
    currentItem: { asd: "asda" },
    stateDb: [
        {
            id: 1, items: [
                { id: 1, type: "input" },
                { id: 2, type: "operations", operations: [{ titleOperations: "/" }, { titleOperations: "x" }, { titleOperations: "-" }, { titleOperations: "+" }] },
                { id: 3, type: "dial", numbers: [{ titleNumbers: "7" }, { titleNumbers: "8" }, { titleNumbers: "9" }, { titleNumbers: "4" }, { titleNumbers: "5" }, { titleNumbers: "6" }, { titleNumbers: "1" }, { titleNumbers: "2" }, { titleNumbers: "3" }, { titleNumbers: "0" }, { titleNumbers: "," }] },
                { id: 4, type: "equally", titleEqually: "=" }]
        },
        { id: 2, items: [{ id: 5, type: 'canvas' }] }
    ]
}) as UserSliceInterface

const calcStore = createSlice({
    name: 'db',
    initialState,
    reducers: {
        setDb: (state, action) => {
            state.stateDb = action.payload;
        },
        setCurrenBoard: (state, action) => {
            state.currentBoard = action.payload
        },
        setCurrentItem: (state, action) => {
            state.currentItem = action.payload
        }
    }
});

export const { setDb, setCurrenBoard, setCurrentItem } = calcStore.actions;

export const { selectAll } = cardsAdapter.getSelectors((state: any) => state.storage)

export default calcStore.reducer;