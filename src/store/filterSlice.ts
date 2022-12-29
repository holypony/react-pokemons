import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Filter = {
  minAttack: number;
  maxAttack: number;
  minHp: number;
  maxHp: number;
};

const currentFilters: Filter = {
  minAttack: 0,
  maxAttack: 999,
  minHp: 0,
  maxHp: 999,
};

type FilterState = {
  currentFilters: Filter;
};
const initialState: FilterState = { currentFilters };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Filter>) {
      state.currentFilters = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
