import React from "react";
import LayOutNewComic from "./Layout";
import { LightModeProvider } from "../../../components/LightDart";

const ComingSoon = () => {
  return (
    <LightModeProvider>
      <LayOutNewComic />
    </LightModeProvider>
  );
};

export default ComingSoon;
