import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../carItems';

const initialState = {
  cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => ({
      ...state,
      cartItems: [],
    }),
    removeItem: (state, { payload }) => ({
      ...state,
      cartItems: state.cartItems.filter((item) => item.id !== payload),
    }
    ),
    increase: (state, { payload }) => ({
      ...state,
      cartItems: state.cartItems.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
        return item;
      }),
    }
    ),
    decrease: (state, { payload }) => ({
      ...state,
      cartItems: state.cartItems.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      }),
    }
    ),
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      return {
        ...state,
        amount,
        total,
      };
    },
  },

});

export const {
  clearCart, removeItem, increase, decrease, calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
