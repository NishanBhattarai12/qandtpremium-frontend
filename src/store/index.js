import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import bookingReducer from './bookingSlice';
import taxReturnReducer from './taxReturnSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'booking', 'taxReturn'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  taxReturn: taxReturnReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;