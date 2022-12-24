import React from "react";
import { useAppSelector } from "../hooks/hook";
import clsx from "clsx";

export const StoreDashboard = () => {
  const storePokemons = useAppSelector((state) => state.pokemon.list);
  const { loading, error } = useAppSelector((state) => state.pokemon);

  const storeSelectedPokemon = useAppSelector(
    (state) => state.pokemon.selected
  );

  return (
    <div className="fixed left-0 bottom-0 rounded-md border border-slate-800 p-2 text-xs">
      {loading ? (
        "loading..."
      ) : (
        <div>Pokemons in store: {storePokemons.length}</div>
      )}
    </div>
  );
};
