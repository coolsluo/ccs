import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import lessonReducer from './lessonSlice';

export const store = configureStore({
    reducer: { user: userReducer, lessons: lessonReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;