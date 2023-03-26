import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import { useHttp } from "src/hooks/http.hook";

interface IdropSlice {
    dropState: any,
    currentBoard: {},
    currentItem: {}
}

const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState({
    dropState: [],
    currentBoard: {},
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
        setCurrenBoard: (state, action) => {
            state.currentBoard = action.payload
        },
        setCurrentItem: (state, action) => {
            state.currentItem = action.payload
        }
    }
});

export const { setDropDb, setCurrenBoard, setCurrentItem } = dropStore.actions;

export const { selectAll } = cardsAdapter.getSelectors((state: any) => state.storage)

export default dropStore.reducer;