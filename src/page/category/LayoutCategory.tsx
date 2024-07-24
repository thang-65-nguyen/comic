import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import LayOutCategory from "./Layout";


const NewCategory = () => {
  return (
    <LightModeProvider>
      <LayOutCategory />
    </LightModeProvider>
  );
};

export default NewCategory;
