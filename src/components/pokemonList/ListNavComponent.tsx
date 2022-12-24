enum SORT {
  byAttack = "byAttack",
  byId = "byId",
  byHp = "byHp",
} //

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
  const handleChangeSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchPhrase(e.currentTarget.value);
  };
  const handleChangeSort = (e: React.FormEvent<HTMLSelectElement>) => {
    setSortState(e.currentTarget.value);
  };

  return (
    <div className=" mr-2 mb-2 w-full rounded-md  flex flex-row flex-wrap gap-2">
      <form action="">
        <input
          type="text"
          className="rounded-md border border-gray-600 bg-zinc-900 p-2 outline-none focus:placeholder:text-zinc-900"
          placeholder="Search here"
          onChange={handleChangeSearchInput}
          value={searchPhrase}
        ></input>
      </form>
      <span className="my-auto text-zinc-400 text-base">Sort by:</span>
      <select
        className="bg-black outline-none"
        name="sort"
        id="lang"
        value={sortState}
        onChange={handleChangeSort}
      >
        <option value={SORT.byId}>By id</option>
        <option value={SORT.byAttack}>By Attack</option>
        <option value={SORT.byHp}>By Hp</option>
      </select>
    </div>
  );
};
