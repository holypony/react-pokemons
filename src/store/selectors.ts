import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

const getAllPokemons = (state: RootState) => state.pokemon.list;
const getFilter = (state: RootState) => state.filters.currentFilters;

export const selectFilter = createSelector(
  [getAllPokemons, getFilter],
  (pokemons, filters) => {
    //if (filters.minHp === 0 && filters.maxHp === 999) return pokemons;

    console.log("filter isnt a initial state");

    return pokemons.filter((pokemon) => {
      return (
        pokemon.stats[0].base_stat >= filters.minHp &&
        pokemon.stats[0].base_stat <= filters.maxHp &&
        pokemon.stats[1].base_stat >= filters.minAttack &&
        pokemon.stats[1].base_stat <= filters.maxAttack
      );
    });
  }
);
