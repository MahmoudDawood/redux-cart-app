import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://fakestoreapi.com/products?limit=5"

const initialState = {
  cartItems: [],
  total: 1,
  amount: 1,
  isLoading: false
}

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const items = await axios(url)
    // console.log("data: ", items.data)
    return items.data.map(item => {
      item["amount"] = 1
      return item
    })
  } catch(e) {
    console.error(e)
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = []
    },
    removeItem: (state, {payload}) => {
      state.cartItems = state.cartItems.filter(item => item.id !== payload.id)
    },
    increase: (state, {payload}) => {
      const item = state.cartItems.find(item => item.id === payload.id)
      item.amount++
    },
    decrease: (state, {payload}) => {
      const item = state.cartItems.find(item => item.id === payload.id)
      item.amount--
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach(item => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      const data = action.payload
      state.cartItems = data
      // console.log(state.cartItems)
      state.isLoading = false
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false
    },
  }
})

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions
export default cartSlice.reducer