import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import LayOutNewComic from "./Layout";

const NewComic = () => {
  return (
    <LightModeProvider>
      <LayOutNewComic />
    </LightModeProvider>
  );
};

export default NewComic;
