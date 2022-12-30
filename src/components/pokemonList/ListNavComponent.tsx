enum SORT {
  byAttack = "byAttack",
  byId = "byId",
  byHp = "byHp",
} //

import React from "react";
import { useAppDispatch } from "../../hooks/hook";
import { setFilter } from "../../store/filterSlice";

export const ListNavComponent = ({
  searchPhrase,
  setSearchPhrase,
  sortState,
  setSortState,
}: {
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  sortState: string;
  setSortState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //
  type Filter = {
    minAttack: number;
    maxAttack: number;
    minHp: number;
    maxHp: number;
  };

  const currentFilters: Filter = {
    minAttack: 0,
    maxAttack: 999,
    minHp: 0,
    maxHp: 999,
  };
  const dispatch = useAppDispatch();

  const handleChangeSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchPhrase(e.currentTarget.value);
  };
  const handleChangeSort = (e: React.FormEvent<HTMLSelectElement>) => {
    setSortState(e.currentTarget.value);
  };
  //

  const handleChangeStats = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "minAttackInput") {
      currentFilters.minAttack = +e.currentTarget.value;
    }
    if (e.currentTarget.name === "maxAttackInput") {
      currentFilters.maxAttack = +e.currentTarget.value;
    }
    if (e.currentTarget.name === "minHpInput") {
      currentFilters.minHp = +e.currentTarget.value;
    }
    if (e.currentTarget.name === "maxHpInput") {
      currentFilters.maxHp = +e.currentTarget.value;
    }
    console.log(currentFilters, e.currentTarget.name);
  };
  //
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    console.log(currentFilters, "submit");
    dispatch(setFilter(currentFilters));
    e.preventDefault();
  };
  const handleClear = () => {
    currentFilters.maxAttack = 999;
    currentFilters.minAttack = 0;
    currentFilters.minHp = 0;
    currentFilters.maxHp = 999;
    setSearchPhrase("");
    dispatch(setFilter(currentFilters));
  };

  return (
    <div className="flex flex-col w-full">
      <div className=" mr-2 mb-2 w-full rounded-md  flex flex-row flex-wrap gap-2">
        <form action="">
          <input
            type="text"
            className="text-sm rounded-md border border-gray-600 bg-zinc-900 p-1 outline-none focus:placeholder:text-zinc-900"
            placeholder="Search here"
            onChange={handleChangeSearchInput}
            value={searchPhrase}
          ></input>
        </form>
        <span className="my-auto text-zinc-400 text-base">Sort by:</span>
        <select
          className="bg-black outline-none"
          name="sort"
          value={sortState}
          onChange={handleChangeSort}
        >
          <option value={SORT.byId}>By id</option>
          <option value={SORT.byAttack}>By Attack</option>
          <option value={SORT.byHp}>By Hp</option>
        </select>
      </div>
      <div>
        <form className="flex flex-row flex-wrap gap-2">
          <div className="flex flex-col gap-1">
            {" "}
            <input
              className=" text-sm rounded-md  bg-zinc-900 p-1 outline-none focus:placeholder:text-zinc-900"
              type="text"
              placeholder="Min attack"
              name="minAttackInput"
              onChange={handleChangeStats}
            />
            <input
              className=" text-sm rounded-md  bg-zinc-900 p-1 outline-none focus:placeholder:text-zinc-900"
              name="maxAttackInput"
              type="text"
              placeholder="Max attack"
              onChange={handleChangeStats}
            />
          </div>
          <div className="flex flex-col gap-1">
            {" "}
            <input
              className=" text-sm rounded-md  bg-zinc-900 p-1 outline-none focus:placeholder:text-zinc-900"
              name="minHpInput"
              type="text"
              placeholder="Min Hp"
              onChange={handleChangeStats}
            />
            <input
              className=" text-sm rounded-md  bg-zinc-900 p-1 outline-none focus:placeholder:text-zinc-900"
              name="maxHpInput"
              type="text"
              placeholder="Max Hp"
              onChange={handleChangeStats}
            />
          </div>

          <button
            className=" font-mono font-bold text-sm outline-none mr-2 rounded-md border border-gray-600 bg-green-600 p-1"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
          <button
            type="reset"
            className=" text-sm font-mono font-bold outline-none rounded-md border border-gray-600 bg-red-900 p-1"
            onClick={handleClear}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};
