import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload.id;
      const foundPoduct = state.cartProducts.find((product) => {
        return product.id === productId;
      });

      if (foundPoduct) {
        foundPoduct.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const filteredProducts = state.cartProducts.filter((product) => {
        return product.id !== productId;
      });

      state.cartProducts = filteredProducts;
    },

    incrementQuantity: (state, action) => {
      const productId = action.payload;

      const foundPoduct = state.cartProducts.find((product) => {
        return product.id == productId;
      });

      if (foundPoduct) {
        foundPoduct.quantity += 1;
      } else {
        state.cartProducts.push(action.payload);
      }
    },

    decrementQuantity: (state, action) => {
      const productId = action.payload;

      const foundPoduct = state.cartProducts.find((product) => {
        return product.id == productId;
      });

      if (foundPoduct && foundPoduct.quantity > 1) {
        foundPoduct.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
