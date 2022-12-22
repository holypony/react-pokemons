import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

export const MainPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("9");
    navigate("/Pokemons");
    //redirect("/Pokemons");
  };

  return (
    <div className="">
      <HeaderComponent />
      <div className="w-full max-w-3xl mx-auto rounded-md border border-slate-800 p-2 h-screen text-center">
        Main Page
        <button onClick={handleClick}>pokemons</button>
      </div>
      <FooterComponent />
    </div>
  );
};
