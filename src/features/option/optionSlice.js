import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({
    name: 'option',
    initialState: {
        value: 1,
    },
    reducers: {
        changeOption: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeOption } = optionSlice.actions;

export const readOption = state => state.option.value;

export default optionSlice.reducer;