import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchTerm : "",
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm : (state,action) => {
            state.searchTerm = action.payload.searchVal
        }
    }
});

export const {setSearchTerm,getSearchResults, setLoading} = searchSlice.actions
export const getSearchState = state => state.search
export default searchSlice.reducer