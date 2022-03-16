import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<typeof initialState['value']>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setLoading } = loading.actions;
export default loading.reducer;
