import React from "react";
import { useGetPokemonSkillsEffects } from "../../hooks/useGetPokemonSkillsEffects";
import { Pokemon } from "../../models/Pokemon";
import { capitalize } from "../../Utils/StringUtils";

export const SkillInfo = ({ pokemon }: { pokemon: Pokemon }) => {
  const [pokemonSkillEffects, isLoading] = useGetPokemonSkillsEffects(pokemon);
  return (
    <div>
      <div className="text-left text-xs">
        <div className="font-bold">Skills: {pokemon.abilities.length}</div>
        {pokemon.abilities.map((item, index) => (
          <div key={index}>
            <div className="font-bold">
              {capitalize(pokemon.abilities[index].ability.name)}
            </div>
            <div>
              {isLoading ? "Loading..." : null}
              {pokemonSkillEffects
                ? pokemonSkillEffects[index]
                : "cant fetch skill info"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
