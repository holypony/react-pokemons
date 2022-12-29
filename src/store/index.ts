import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    filters: filterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
