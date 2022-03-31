import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export const readUser = state => state.user.value;

export default userSlice.reducer;