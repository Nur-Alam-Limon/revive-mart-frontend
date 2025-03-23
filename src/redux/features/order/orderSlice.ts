import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Transaction {
  _id: string;
  buyerID: string;
  sellerID: string;
  itemID: string;
  status: 'pending' | 'completed';
  timestamp: string;
}

interface OrderState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  transactions: [],
  loading: false,
  error: null,
};

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`;

// Async actions
export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  { token?: string },
  { rejectValue: string; state: { auth: { token: string | null } } }
>('orders/fetchAllTransactions', async ({ token }, { rejectWithValue, getState }) => {
  try {
    const userToken = token || (getState().auth.token);

    if (!userToken) {
      throw new Error("User token is not available for API request");
    }

    const response = await axios.get(`${API_URL}/transactions`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data.transactions;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
  }
});

export const fetchPurchaseHistory = createAsyncThunk<
  Transaction[],
  { buyerId: string; token?: string },
  { rejectValue: string; state: { auth: { token: string | null } } }
>('orders/fetchPurchaseHistory', async ({ buyerId, token }, { rejectWithValue, getState }) => {
  try {
    const userToken = token || (getState().auth.token);

    if (!userToken) {
      throw new Error("User token is not available for API request");
    }

    const response = await axios.get(`${API_URL}/transactions/purchase/${buyerId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data.transactions;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch purchase history');
  }
});

export const fetchSellHistory = createAsyncThunk<
  Transaction[],
  { sellerId: string; token?: string },
  { rejectValue: string; state: { auth: { token: string | null } } }
>('orders/fetchSellHistory', async ({ sellerId, token }, { rejectWithValue, getState }) => {
  try {
    const userToken = token || (getState().auth.token);

    if (!userToken) {
      throw new Error("User token is not available for API request");
    }

    const response = await axios.get(`${API_URL}/transactions/sell/${sellerId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data.transactions;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch sell history');
  }
});

export const createTransaction = createAsyncThunk<
  Transaction,
  { transactionData: { buyerID: string; sellerID: string; itemID: string; status: 'pending' | 'completed' }; token?: string },
  { rejectValue: string; state: { auth: { token: string | null } } }
>('orders/createTransaction', async ({ transactionData, token }, { rejectWithValue, getState }) => {
  try {
    const userToken = token || (getState().auth.token);

    if (!userToken) {
      throw new Error("User token is not available for API request");
    }

    const response = await axios.post(API_URL, transactionData, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data.transaction;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create transaction');
  }
});

export const updateTransactionStatus = createAsyncThunk<
  Transaction,
  { transactionId: string; status: 'pending' | 'completed'; token?: string },
  { rejectValue: string; state: { auth: { token: string | null } } }
>('orders/updateTransactionStatus', async ({ transactionId, status, token }, { rejectWithValue, getState }) => {
  try {
    const userToken = token || (getState().auth.token);

    if (!userToken) {
      throw new Error("User token is not available for API request");
    }

    const response = await axios.put(`${API_URL}/${transactionId}`, { status }, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data.transaction;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update transaction status');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch all transactions';
      })
      .addCase(fetchPurchaseHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPurchaseHistory.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchPurchaseHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch purchase history';
      })
      .addCase(fetchSellHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellHistory.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchSellHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch sell history';
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create transaction';
      })
      .addCase(updateTransactionStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.loading = false;
        const index = state.transactions.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update transaction status';
      });
  },
});

export default orderSlice.reducer;
