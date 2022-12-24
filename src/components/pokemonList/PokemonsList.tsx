import React, {
  ComponentPropsWithoutRef,
  ElementType,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pokemon } from "../../models/Pokemon";
import { ListNavComponent } from "./ListNavComponent";
import { PokemonMiniCard } from "./PokemonMiniCard";
import { LoadingComponent } from "../LoadingComponent"; //
import clsx from "clsx";
//
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  fetchPokemons,
  selectPokemonsByFilter,
} from "../../store/pokemonSlice";
import { useSelector } from "react-redux";

enum SORT {
  byAttack = "byAttack",
  byId = "byId",
  byHp = "byHp",
}

type TestProps<T extends ElementType> = {
  tag?: T;
} & ComponentPropsWithoutRef<T>;

function MyComponent<T extends ElementType>({
  tag,
  children,
  ...rest
}: TestProps<T>) {
  const Component = tag || "div";
  return <Component {...rest}>{children}</Component>;
}

export const PokemonsList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const storePokemons = useAppSelector((state) => state.pokemon.list);
  //const storePokemons = useAppSelector((state) => selectPokemonsByFilter);
  const { loading, error } = useAppSelector((state) => state.pokemon);
  useEffect(() => {
    if (storePokemons.length > 1) return;
    dispatch(fetchPokemons());
  }, [dispatch]);
  //

  //
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [sortState, setSortState] = useState<string>(SORT.byId);
  //

  //
  const searchHandle = (searchPhrase: string): Pokemon[] => {
    const filtered = storePokemons.filter((pokemon) => {
      if (pokemon.name.includes(searchPhrase.toLocaleLowerCase())) {
        return true;
      }
    });
    return filtered;
  };
  //
  const sortArr = (pokemons: Pokemon[]): Pokemon[] => {
    console.log(pokemons.length + " sort arr pokemons length");
    const items = [...pokemons];
    items.sort((a, b) => {
      if (sortState === SORT.byAttack) {
        return b.stats[1].base_stat - a.stats[1].base_stat;
      } else if (sortState === SORT.byHp) {
        return b.stats[0].base_stat - a.stats[0].base_stat;
      } else {
        return a.id - b.id;
      }
    });
    return items;
  };
  //
  useEffect(() => {
    if (searchPhrase !== "") {
      const sorted = sortArr(searchHandle(searchPhrase));
      setFilteredPokemons(sorted);
      return;
    }

    if (storePokemons.length < 1) return;
    const sorted = sortArr(storePokemons);
    setFilteredPokemons(sorted);
    //
  }, [searchPhrase, sortState, storePokemons]);

  // useMemo(() => {
  //   const sorted = sortArr(props.pokemons);
  //   console.log("now we sort pokemons");
  //   setFilteredPokemons(sorted);
  // }, [sortState]);

  return (
    <>
      <div className="w-full mx-auto flex flex-row flex-wrap">
        <ListNavComponent
          setSearchPhrase={setSearchPhrase}
          searchPhrase={searchPhrase}
          sortState={sortState}
          setSortState={setSortState}
        />
        {error ? (
          <>
            <div>Sorry, something went wrong...</div>
            <div className="overflow-hidden text-sm">{error}</div>
          </>
        ) : loading ? (
          <LoadingComponent />
        ) : filteredPokemons ? (
          filteredPokemons.map((item, index) => (
            <PokemonMiniCard key={index} pokemon={item} />
          ))
        ) : null}
      </div>
    </>
  );
};
