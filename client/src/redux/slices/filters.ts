import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  filterBy: 0 as number | null,
  sortBy: 0,
};

const filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterBy: (
      state,
      action: PayloadAction<typeof initialState['filterBy']>
    ) => {
      state.filterBy = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<typeof initialState['sortBy']>
    ) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setFilterBy, setSortBy } = filters.actions;
export default filters.reducer;
