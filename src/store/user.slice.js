import {createSlice} from "@reduxjs/toolkit";

const initialState = {user: null};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        storeUser(state, action) {
            state.user = action.payload.user;
        },
        deleteUser(state, action) {
            state.user = null;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;