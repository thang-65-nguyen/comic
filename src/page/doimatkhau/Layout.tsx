import React from "react";
import { LightModeProvider } from "../../components/LightDart";

import Footer from "../../components/footer";
import DoiMatKhau from "./Index";
import Header from "../../components/header";

const LayoutDoiPassword = () => {
  return (
    <LightModeProvider>
      <Header />
      <DoiMatKhau />
      <Footer />
    </LightModeProvider>
  );
};

export default LayoutDoiPassword;
