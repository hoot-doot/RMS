import { configureStore } from '@reduxjs/toolkit';
import authReducer from './scenes/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;