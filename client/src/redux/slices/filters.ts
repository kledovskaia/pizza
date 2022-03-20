import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  filterBy: null as number | null,
  sortBy: 'popularity',
  orderBy: 'asc',
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
      state.sortBy = action.payload;
      state.orderBy =
        orderVariants[action.payload as keyof typeof orderVariants];
    },
  },
});

export const { setFilterBy, setSortBy } = filters.actions;
export default filters.reducer;
