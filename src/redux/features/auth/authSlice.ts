import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Type Definitions
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  profilePic: string
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  users: User[];
}

const API_URL = 'http://localhost:3000/api/auth';

// Async actions
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // Assuming the response contains the user data and token
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Registration failed');
    }
  }
);


export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'Login failed');
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userData, token }: { userData: Partial<User>, token?: string }, { rejectWithValue, getState }) => {
    try {
      // Get token from state if not provided in the argument
      const state = (getState() as { auth: AuthState }).auth;
      const usedToken = token || state.token;

      if (!usedToken) {
        throw new Error("User token is not available for API request");
      }

      // Make the API request with the token
      const response = await axios.put(`${API_URL}/profile`, userData, {
        headers: { Authorization: `Bearer ${usedToken}` }
      });

      // Return updated user data
      return response.data.user;
    } catch (error: any) {
      // Reject with error message if request fails
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);


export const fetchUsers = createAsyncThunk('auth/fetchUsers', async (_, { rejectWithValue, getState }) => {
  try {
    const state = (getState() as { auth: AuthState }).auth;
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${state.token}` }
    });
    return response.data.users;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'Failed to fetch users');
  }
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (id: string, { rejectWithValue, getState }) => {
  try {
    const state = (getState() as { auth: AuthState }).auth;
    await axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${state.token}` }
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'Failed to delete user');
  }
});

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  users: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setToken: (state, action: PayloadAction<{ token: string | null; user: User | null }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;


