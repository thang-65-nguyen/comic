import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import LayoutDescribe from "./LayoutDescribe";

const DescribeComic = () => {
  return (
    <LightModeProvider>
      <LayoutDescribe />
    </LightModeProvider>
  );
};

export default DescribeComic;
