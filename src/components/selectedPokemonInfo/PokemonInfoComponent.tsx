import { useAppSelector } from "../../hooks/hook";
import { Pokemon } from "../../models/Pokemon";
import { capitalize } from "../../Utils/StringUtils";
import { SkillInfo } from "./SkillInfo";
//
export const PokemonInfoComponent = (): JSX.Element => {
  const pokemon = useAppSelector((state) => state.pokemon.selected);

  //
  let imgSrc = "https://media.tenor.com/cY073Nz9hTUAAAAM/pokeball-pokemon.gif";
  if (pokemon) {
    if (pokemon.sprites.front_default === null) {
      imgSrc = "https://cdn-icons-png.flaticon.com/128/3020/3020000.png";
    } else {
      imgSrc = pokemon.sprites.front_default;
    }
  }

  return (
    <div className="text-2xl text-center p-2 border border-zinc-700 overflow-hidden">
      <div className="flex flex-col justify-center gap-2">
        <>
          <div className="text-lg">
            You pick: {pokemon ? capitalize(pokemon.name) : "none"}
          </div>
          <div className="flex flex-col justify-center">
            <img
              className="border border-zinc-700"
              src={
                pokemon
                  ? imgSrc
                  : "https://media.tenor.com/cY073Nz9hTUAAAAM/pokeball-pokemon.gif"
              }
              alt="pokemon"
            />
          </div>
          <div className="text-left text-sm">
            {pokemon ? (
              <>
                <div className="font-bold">Stats:</div>
                {pokemon.stats.map((item, index) => (
                  <div key={index}>
                    {capitalize(item.stat.name)} : {item.base_stat}
                  </div>
                ))}
              </>
            ) : null}
          </div>
          {pokemon ? <SkillInfo pokemon={pokemon} /> : null}
        </>
      </div>
    </div>
  );
};
