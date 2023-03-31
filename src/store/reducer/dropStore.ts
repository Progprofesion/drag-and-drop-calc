import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import { useHttp } from "src/hooks/http.hook";

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

const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState({
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

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const { request } = useHttp();
        return await request('https://my-json-server.typicode.com/Progprofesion/test-task-sy')
    }
);

const dropStore = createSlice({
    name: 'db',
    initialState,
    reducers: {
        setDropDb: (state, action) => {
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
    setDropDb,
    setCurrentBoard,
    setCurrentItem,
    setDisabledDrop,
    setHugState } = dropStore.actions;

export const { selectAll } = cardsAdapter.getSelectors((state: any) => state.storage)

export default dropStore.reducer;