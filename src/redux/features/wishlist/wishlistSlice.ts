import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
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
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex === -1) {
        state.items.push(action.payload); // Add to wishlist if not already present
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload); // Remove item by ID
    },
    clearWishlist: (state) => {
      state.items = []; // Reset wishlist items to an empty array
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
