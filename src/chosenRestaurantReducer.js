import { createSlice } from "@reduxjs/toolkit";

const RestSlice = createSlice({
  name: "chosenRestaurant",
  initialState: null,
  reducers: {
    choose(state, action) {
        console.log("PAYLOAD IS:", action.payload)
        console.log(action.payload.rest)
        //state = action.payload.rest;
        return action.payload.rest
    },
    forsake(state, action) {
        return null;
    },
  },
});

export const { choose, forsake } = RestSlice.actions;
export default RestSlice.reducer;
