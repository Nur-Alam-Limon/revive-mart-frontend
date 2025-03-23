
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Type Definitions
interface Listing {
  _id?: string;
  title: string;
  description: string;
  price: number;
  condition: 'Used';
  image: string;
  userId: string;
  status: 'available' | 'sold';
}

interface ListingsState {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  searchQuery: string; // Add search query state
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/listings`;

// Async actions
export const fetchListings = createAsyncThunk<{ listings: Listing[]; success: boolean }>(
  'listings/fetchListings',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = (getState() as { auth: { token: string | null } }).auth;
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      return response.data;  // Return the entire response object
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch listings');
    }
  }
);

export const fetchListingsUser = createAsyncThunk<{ listings: Listing[]; success: boolean }>(
  'listings/fetchListingsUser',
  async (email, { rejectWithValue, getState }) => {
    try {
      const state = (getState() as { auth: { token: string | null } }).auth;
      const response = await axios.get(`${API_URL}/${email}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      return response.data;  // Return the entire response object
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch listings');
    }
  }
);

export const createListing = createAsyncThunk<
  Listing,
  { listingData: Listing; token?: string }
>(
  'listings/createListing',
  async ({ listingData, token }, { rejectWithValue, getState }) => {
    try {
      console.log('tpoken', token);
      // Get token from state if not provided via props
      const state = (getState() as { auth: { token: string | null } }).auth;
      const userToken = state.token;

      const usedToken = token || userToken;
      console.log('tpokenasda', usedToken);

      if (!usedToken) {
        throw new Error("User token is not available for API request");
      }

      const response = await axios.post(API_URL, listingData, {
        headers: { Authorization: `Bearer ${usedToken}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create listing');
    }
  }
);

export const updateListing = createAsyncThunk<
  Listing,
  { id: string; updateData: Partial<Listing>; token?: string }
>(
  'listings/updateListing',
  async ({ id, updateData, token }, { rejectWithValue, getState }) => {
    try {
      // Get token from user state if not provided in props
      const state = (getState() as { auth: { token: string | null } }).auth;
      const userToken = state.token;

      const usedToken = token || userToken;

      const response = await axios.put(`${API_URL}/${id}`, updateData, {
        headers: { Authorization: `Bearer ${usedToken}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update listing');
    }
  }
);



export const deleteListing = createAsyncThunk<string, { id: string; token?: string }>(
  'listings/deleteListing',
  async ({id, token}, { rejectWithValue, getState }) => {
    try {
      const state = (getState() as { auth: { token: string | null } }).auth;
      const userToken = state.token;

      const usedToken = token || userToken;
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${usedToken}` }
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to delete listing');
    }
  }
);

const initialState: ListingsState = {
  listings: [],
  loading: false,
  error: null,
  searchQuery: '', // Initialize the search query state
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Listing[]>) => {
      state.listings = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload; // Update search query state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action: PayloadAction<{ listings: Listing[]; success: boolean }>) => {
        state.listings = action.payload.listings;  // Extract the 'listings' array from the response object
        state.loading = false;
        state.error = null;
      })      
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createListing.fulfilled, (state, action: PayloadAction<Listing>) => {
        state.listings.push(action.payload);
      })
      .addCase(updateListing.fulfilled, (state, action: PayloadAction<Listing>) => {
        // Safeguard to ensure listings is an array and findIndex doesn't fail
        if (Array.isArray(state.listings)) {
          const index = state.listings.findIndex((listing) => listing._id === action.payload._id);
          if (index >= 0) state.listings[index] = action.payload;
        }
      })
      .addCase(deleteListing.fulfilled, (state, action: PayloadAction<string>) => {
        // Safeguard to ensure listings is an array
        if (Array.isArray(state.listings)) {
          state.listings = state.listings.filter((listing) => listing._id !== action.payload);
        }
      });
  },
});

export const { setProducts, setSearchQuery } = listingsSlice.actions;
export default listingsSlice.reducer;
