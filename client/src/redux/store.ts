import { configureStore, Middleware } from '@reduxjs/toolkit';
import { debounce } from '../helpers';
import { rootReducer } from './slices';

const preloadedState =
  JSON.parse(localStorage.getItem('applicationState')!) || {};

const localStorageWithDebounce = debounce(1000, (obj: AppState) =>
  localStorage.setItem('applicationState', JSON.stringify(obj))
);

const localStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    localStorageWithDebounce(getState());
    return result;
  };

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
