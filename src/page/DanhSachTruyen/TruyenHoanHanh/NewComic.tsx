import React from "react";

import LayOutNewComic from "./Layout";
import { LightModeProvider } from "../../../components/LightDart";

const CompleteComic = () => {
  return (
    <LightModeProvider>
      <LayOutNewComic />
    </LightModeProvider>
  );
};

export default CompleteComic;
