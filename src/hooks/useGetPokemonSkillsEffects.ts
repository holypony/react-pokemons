import axios from "axios";
import { useEffect, useState } from "react";
import { Ability, Pokemon } from "../models/Pokemon";

export const useGetPokemonSkillsEffects = (
  pokemon: Pokemon
): [string[], boolean] => {
  //
  const [skillInfo, setSkillInfo] = useState<string[]>([]);
  //
  const [loading, setLoading] = useState(false);
  //
  useEffect(() => {
    (async () => {
      setSkillInfo([]);
      const requests = new Array(0);
      try {
        setLoading(true);
        pokemon.abilities.map((item) => {
          requests.push(fetchDataFromUrl(item.ability.url));
        });
        const responses: string[] = await Promise.all(requests);
        setSkillInfo([...responses]);
      } catch (e) {
        console.log(e as string);
        return "Can`t fetch data";
      } finally {
        setLoading(false);
      }
    })();
  }, [pokemon]);

  const fetchDataFromUrl = async (url: string) => {
    const resp = await axios.get(url);
    const result = resp.data as Ability;
    return result.effect_entries[1].effect;
  };

  return [skillInfo, loading];
};
