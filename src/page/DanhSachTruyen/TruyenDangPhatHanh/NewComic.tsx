import React from "react";
import LayOutNewComic from "./Layout";
import { LightModeProvider } from "../../../components/LightDart";


const RelasingComic = () => {
  return (
    <LightModeProvider>
      <LayOutNewComic />
    </LightModeProvider>
  );
};

export default RelasingComic;
