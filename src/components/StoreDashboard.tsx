import React from "react";
import { useAppSelector } from "../hooks/hook";
import clsx from "clsx";

export const StoreDashboard = () => {
  const storePokemons = useAppSelector((state) => state.pokemon.list);
  const storeSelectedPokemon = useAppSelector(
    (state) => state.pokemon.selected
  );
  let img = "";
  if (
    storeSelectedPokemon &&
    storeSelectedPokemon.sprites.front_default !== null
  ) {
    img = storeSelectedPokemon.sprites.front_default;
  }
  return (
    <div
      className={clsx([
        {
          "fixed left-0 bottom-0 rounded-md border border-slate-800 p-2 text-xs":
            true,
        },
        { hidden: storePokemons.length < 1 },
      ])}
    >
      Objects in store: {storePokemons.length}
      {storeSelectedPokemon ? <img className="h-30 w-30" src={img} /> : null}
    </div>
  );
};
