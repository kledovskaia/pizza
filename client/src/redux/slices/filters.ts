import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  filterBy: null as number | null,
  sortBy: 'popularity',
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
