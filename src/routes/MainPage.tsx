import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { StoreDashboard } from "../components/StoreDashboard";

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
        You are on the main page
        <br />
        <button className="border border-zinc-600 p-2" onClick={handleClick}>
          This is navigate button on pokemons list
        </button>
      </div>
      <FooterComponent />
      <StoreDashboard />
    </div>
  );
};
