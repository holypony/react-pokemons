import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoaderComponent } from "./routes/LoaderComponent";
import { MainPage } from "./routes/MainPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/Pokemons" element={<LoaderComponent />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
