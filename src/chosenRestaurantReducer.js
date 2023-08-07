import { createSlice } from "@reduxjs/toolkit";

const RestSlice = createSlice({
  name: "chosenRestaurant",
  initialState: null,
  reducers: {
    choose(state, action) {
        return action.payload.rest
    },
    forsake(state, action) {
        return null;
    },
  },
});

export const { choose, forsake } = RestSlice.actions;
export default RestSlice.reducer;
