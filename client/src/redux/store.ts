import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';

export const store = createStore(rootReducer);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
