import React, { useEffect, useState } from "react";
import { PokemonsList } from "../components/pokemonList/PokemonsList";
import { PokemonInfoComponent } from "../components/selectedPokemonInfo/PokemonInfoComponent";
import HeaderComponent from "../components/HeaderComponent";
import { StoreDashboard } from "../components/StoreDashboard";
import FooterComponent from "../components/FooterComponent";
import { fetchPokemons } from "../store/pokemonSlice";
import { useAppDispatch } from "../hooks/hook";
export const LoaderComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <>
      <HeaderComponent />
      <div className="component relative">
        <div className="flex flex-row">
          <div className="w-2/3">
            <PokemonsList />
          </div>
          <div className="w-1/3">
            <PokemonInfoComponent />
          </div>
        </div>
      </div>
      <StoreDashboard />
      <FooterComponent />
    </>
  );
};
