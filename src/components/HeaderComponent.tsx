import React from "react";
import { Link } from "react-router-dom";
const HeaderComponent = () => {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-md border border-slate-800 p-2">
      <div className="w-full flex flex-row gap-1">
        <Link to="/" className="w-1/3 text-xl font-bold hover:text-yellow-400">
          Main Page
        </Link>
        <Link to="/Pokemons" className="w-1/5 hover:text-yellow-400">
          Pokemons Page
        </Link>
      </div>
    </div>
  );
};

export default HeaderComponent;
