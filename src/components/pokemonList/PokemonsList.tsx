import React, { useEffect, useState } from "react";
import { Pokemon } from "../../models/Pokemon";
import { ListNavComponent } from "./ListNavComponent";
import { PokemonMiniCard } from "./PokemonMiniCard";
import { LoadingComponent } from "../LoadingComponent"; //
//
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  fetchPokemons,
  selectPokemonsByFilter,
} from "../../store/pokemonSlice";
import { selectFilter } from "../../store/selectors";
enum SORT {
  byAttack = "byAttack",
  byId = "byId",
  byHp = "byHp",
}

export const PokemonsList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  //const storePokemons = useAppSelector((state) => state.pokemon.list);
  //const storePokemons = useAppSelector(selectPokemonsByFilter);
  const storePokemons = useAppSelector(selectFilter);
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
      setStartPokemonIndex(0);
      setCurrentPage(1);
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
  const pokemonsOnPage = 20;
  //
  const [startPokemonIndex, setStartPokemonIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageArr: Pokemon[] = filteredPokemons.slice(
    startPokemonIndex,
    startPokemonIndex + pokemonsOnPage
  );
  //
  const nextPage = () => {
    if (filteredPokemons.length < currentPage * pokemonsOnPage) return;
    setStartPokemonIndex(startPokemonIndex + pokemonsOnPage);
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    if (currentPage === 1) return;
    setStartPokemonIndex(startPokemonIndex - pokemonsOnPage);
    setCurrentPage(currentPage - 1);
  };
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
        ) : pageArr ? (
          pageArr.map((item, index) => (
            <PokemonMiniCard key={index} pokemon={item} />
          ))
        ) : null}
      </div>
      <div className="flex flex-row gap-2">
        {" "}
        <button
          className=" text-sm font-mono font-bold outline-none rounded-md border border-gray-600 bg-slate-900 p-1"
          onClick={previousPage}
        >
          Previous page
        </button>
        <span>{currentPage}</span>
        <button
          className=" text-sm font-mono font-bold outline-none rounded-md border border-gray-600 bg-green-600 p-1"
          onClick={nextPage}
        >
          Next page
        </button>
      </div>
    </>
  );
};
