
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Product[];
}

interface Product {
    _id?: string;
  title: string;
  description: string;
  price: number;
  condition: 'Used';
  image: string;
  userId: string;
  cartQuantity?: number;
  quantity?: number;
  }

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex === -1) {
        // If the item is not already in the cart, add it with a cartQuantity of 1
        state.items.push({ ...action.payload, cartQuantity: 1 });
      } else {
        // If the item is already in the cart, just update the cartQuantity
        const existingItem = state.items[existingItemIndex];
        
        // Check if existingItem is defined before updating
        if (existingItem.cartQuantity && action.payload.quantity) {
          // Ensure cartQuantity does not exceed product.quantity
          const maxQuantity = action.payload.quantity;
          existingItem.cartQuantity = Math.min(existingItem.cartQuantity + 1, maxQuantity);
        }
      }
      
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload); // Remove item by ID
    },
    clearCart: (state) => {
      state.items = []; // Reset cart items to an empty array
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
