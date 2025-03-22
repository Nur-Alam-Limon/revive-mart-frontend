import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './features/auth/authSlice';
import listingsReducer from './features/listing/listingSlice';
import transactionsReducer from './features/order/orderSlice';
import cartReducer from './features/cart/cartSlice'

const persistConfig = {
  key: 'auth',
  storage, 
  whitelist: ['user', 'token', 'isAuthenticated'], // These parts of the state will be persisted
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const persistCartConfig = {
  key: 'cart', 
  storage, 
};

const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    listings: listingsReducer,
    transactions: transactionsReducer,
    cart: persistedCartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values to avoid errors from redux-persist
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
