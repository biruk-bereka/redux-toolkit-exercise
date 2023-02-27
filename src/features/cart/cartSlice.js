import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import cartItems from '../../carItems';

const url = 'https://course-api.com/react-useReducer-cart-project';
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () => fetch(url).then((resp) => resp.json()).catch((err) => console.log(err)));

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
  extraReducers: {
    [getCartItems.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [getCartItems.fulfilled]: (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: action.payload,
    }),
    [getCartItems.rejected]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },

});

export const {
  clearCart, removeItem, increase, decrease, calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
