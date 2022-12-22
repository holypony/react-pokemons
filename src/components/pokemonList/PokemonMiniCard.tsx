import { Pokemon } from "../../models/Pokemon";

import clsx from "clsx";
import { capitalize } from "../../Utils/StringUtils";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { addSelectedPokemon } from "../../store/pokemonSlice";

export const PokemonMiniCard = ({
  pokemon,
}: {
  pokemon: Pokemon;
}): JSX.Element => {
  const selectedPokemon = useAppSelector((state) => state.pokemon.selected);
  const isCurrentPokemonSelected = selectedPokemon?.id === pokemon.id;

  const dispatch = useAppDispatch();

  const handleCardClick = () => {
    if (pokemon.id === null) return;
    dispatch(addSelectedPokemon(pokemon));
  };

  const handleFavoriteClick = () => {
    console.log(1);
    //dispatch(addFavoritesPokemon(pokemon));
  };

  return (
    <div
      onClick={handleCardClick}
      className={clsx([
        {
          "flex flex-col w-[110px]  hover:cursor-pointer p-1 m-1 rounded-lg overflow-hidden hover:text-yellow-400 hover:scale-105 transition-transform active:scale-[0.99]":
            true,
        },
        { "bg-white bg-opacity-20": isCurrentPokemonSelected },
        { "hover:bg-white hover:bg-opacity-10": !isCurrentPokemonSelected },
      ])}
    >
      <div onClick={handleFavoriteClick} className="flex flex-row justify-end">
        {" "}
        <img
          className="h-4 w-4 invert"
          src="https://cdn-icons-png.flaticon.com/128/149/149220.png"
        />
      </div>

      {pokemon.sprites.front_default ? (
        <img className="h-30 w-30" src={pokemon.sprites.front_default} />
      ) : (
        <img
          className="h-30 w-30"
          src={"https://media.tenor.com/UnFx-k_lSckAAAAC/amalie-steiness.gif"}
        />
      )}

      <div className="w-full text-center text-lg ">
        {capitalize(pokemon.name)}
      </div>
    </div>
  );
};
