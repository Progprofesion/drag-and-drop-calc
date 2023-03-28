import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import { useHttp } from "src/hooks/http.hook";

interface IdropSlice {
    dropState: any,
    currentBoard: any,
    currentItem: any
}

const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState({
    dropState: [],
    currentBoard: {
        id: 0
    },
    currentItem: {}

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
        }
    }
});
export const { setDropDb, setCurrentBoard, setCurrentItem } = dropStore.actions;

export const { selectAll } = cardsAdapter.getSelectors((state: any) => state.storage)

export default dropStore.reducer;