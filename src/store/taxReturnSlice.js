import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taxReturn: {},
};

const taxReturnSlice = createSlice({
  name: 'taxReturn',
  initialState,
  reducers: {
    addTaxReturn: (state, action) => {
        state.taxReturn = action.payload;
    },
    clearTaxReturn: (state) => {
        state.taxReturn = {};
    },
  },
});

export const { addTaxReturn } = taxReturnSlice.actions;
export default taxReturnSlice.reducer;