import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: {},
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action) => {
        state.bookings = action.payload;
    },
    clearBookings: (state) => {
        state.bookings = {};
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;