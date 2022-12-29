import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
  AnyAction,
} from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { BaseURL } from "../constants/baseUrl";
import { Endpoints } from "../constants/endPoints";
import type { Pokemon } from "../models/Pokemon";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

// create selector
const getAllPokemons = (state: PokemonsState) => state.list;

const getSelectedPokemons = (state: RootState) => state.pokemon.list;

export const selectPokemonsByFilter = createSelector(
  [getSelectedPokemons],
  (pokemons) => {
    console.log("custom selector runned");
    //return pokemons.reduce((list) => pokemons, initialState.list);
    return pokemons.filter((pokemons) => pokemons.id < 5);
  }
);

type RejectValueType = {
  rejectValue: string;
};

type PokemonsState = {
  list: Pokemon[];
  selected: Pokemon | undefined;
  loading: boolean;
  error: string | undefined;
};

const initialState: PokemonsState = {
  list: [],
  selected: undefined,
  loading: false,
  error: undefined,
};

// const getPokemonByIdThunk = async (
//   pokemonId: string,
//   { rejectWithValue }: { rejectWithValue: (arg: string) => void }
// ): Promise<string> => {
//   const a = "wanna be a pokemon someday";
//   rejectWithValue("asdasd");
//   return a;
// };

// export const fetchPokemonById = createAsyncThunk<
//   string,
//   string,
//   RejectValueType
// >("pokemons/fetchPokemonsById", getPokemonByIdThunk);

export const fetchPokemons = createAsyncThunk<
  Pokemon[],
  undefined,
  { rejectValue: string }
>("pokemons/fetchPokemons", async function (_, { rejectWithValue }) {
  const pokemonsToLoad = 50;
  let currentPokemonId = 1;

  const pokemonArray: Pokemon[] | undefined = [];
  try {
    while (currentPokemonId <= pokemonsToLoad) {
      //
      const url =
        BaseURL.REST + Endpoints.Pokemon + "/" + currentPokemonId.toString();
      //
      const response = await axios.get(url).catch(function (error) {
        if (error.response) {
          console.log("errrr");
          currentPokemonId++;
          throw rejectWithValue("fetch error");
        }
      });
      if (response) {
        const pokemon = response.data as Pokemon;
        currentPokemonId++;
        pokemonArray.push(pokemon);
      }
    }
  } catch (e) {
    throw rejectWithValue("fetch error");
  }
  return pokemonArray;
});

const pokemonSlice = createSlice({
  name: "pokemon",

  initialState,
  reducers: {
    addPokemons(state, action: PayloadAction<Pokemon[]>) {
      state.list = action.payload;
    },
    addSelectedPokemon(state, action: PayloadAction<Pokemon | undefined>) {
      state.selected = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addPokemons, addSelectedPokemon } = pokemonSlice.actions;
function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
export default pokemonSlice.reducer;
