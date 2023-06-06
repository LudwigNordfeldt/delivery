import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    createOrder(state,action) {
      state.push(action.payload)
    },
    removeOrder(state,action) {
      return state.filter(el => el.name !== action.payload)
    },
    addOrder(state,action) {
      return state.map(el => el.name === action.payload ? {...el, number: el.number+1} : el)
    },
    substractOrder(state,action) {
      if (state.find(el => el.name === action.payload).number > 1) {
        return state.map(el => el.name === action.payload ? {...el, number: el.number-1} : el)
      }
      return state
    }
  }
})

export const { createOrder, removeOrder, addOrder, substractOrder } = orderSlice.actions
export default orderSlice.reducer