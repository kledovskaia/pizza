import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  filterBy: null as number | null,
  sortBy: 'popularity',
  order: 'desc',
};

const orderVariants = {
  popularity: 'desc',
  price: 'desc',
  alphabet: 'asc',
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
      if (state.sortBy === action.payload) {
        state.order = state.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.order =
          orderVariants[action.payload as keyof typeof orderVariants];
      }
    },
  },
});

export const { setFilterBy, setSortBy } = filters.actions;
export default filters.reducer;
