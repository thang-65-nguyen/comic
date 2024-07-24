import React from "react";
import { LightModeProvider } from "../../components/LightDart";

import Index from "./Index";
import Footer from "../../components/footer";
import Header from "../../components/header";

const LayoutTruyenMoiCapNhat = () => {
  return (
    <LightModeProvider>
      <Header />
      <Index />
      <Footer />
    </LightModeProvider>
  );
};

export default LayoutTruyenMoiCapNhat;
