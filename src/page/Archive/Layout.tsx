import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import LayOutArchive from "./Index";

const Archive = () => {
  return (
    <LightModeProvider>
      <LayOutArchive />
    </LightModeProvider>
  );
};

export default Archive;
