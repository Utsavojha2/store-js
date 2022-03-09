import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login : (state, action) => {
            state.user = action.payload
        },
        logout : (state) => {
            state.user = null;
        },
        signUp : (state,action) => {
            state.user = action.payload
        }
    }
});

export const {signUp, login,logout} = userSlice.actions
export const getUser = state => state.user.user
export default userSlice.reducer