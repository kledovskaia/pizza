import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';

export const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
