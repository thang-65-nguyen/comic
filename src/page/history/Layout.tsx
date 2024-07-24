import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import LayOutHistory from "./History";


const History = () => {
  return (
    <LightModeProvider>
      <LayOutHistory />
    </LightModeProvider>
  );
};

export default History;
