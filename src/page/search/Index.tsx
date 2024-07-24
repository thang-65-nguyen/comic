import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import LayOutSearchs from "./LayoutSearch";

const Search = () => {
  return (
    <LightModeProvider>
      <LayOutSearchs />
    </LightModeProvider>
  );
};

export default Search;
