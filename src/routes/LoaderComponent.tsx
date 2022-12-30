import React, { useEffect, useState } from "react";
import { PokemonsList } from "../components/pokemonList/PokemonsList";
import { PokemonInfoComponent } from "../components/selectedPokemonInfo/PokemonInfoComponent";
import HeaderComponent from "../components/HeaderComponent";
import { StoreDashboard } from "../components/StoreDashboard";
import FooterComponent from "../components/FooterComponent";
import clsx from "clsx";

export const LoaderComponent = (): JSX.Element => {
  //
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  //
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <>
      <HeaderComponent />
      <div className="component relative min-h-screen">
        <div className="flex flex-row">
          <div className="w-2/3">
            <PokemonsList />
            <button
              className={clsx([
                {
                  "fixed right-2 bottom-5 p-2  bg-opacity-5 bg-white": true,
                },
                { " border border-gray-700": showButton },
                { "hidden border border-gray-700": !showButton },
              ])}
              onClick={scrollToTop}
            >
              Back to top
            </button>
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
