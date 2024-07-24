import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import LayoutChapter from "./LayoutChapter";

const Chapter = () => {
  return (
    <LightModeProvider>
      <LayoutChapter />
    </LightModeProvider>
  );
};

export default Chapter;
