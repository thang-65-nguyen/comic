import React from "react";
import { LightModeProvider } from "../../components/LightDart";
import Content from "../../page/home";


const Home = () => {
  return (    
      <LightModeProvider>
        <Content />
      </LightModeProvider>
    
  );
};

export default Home;
