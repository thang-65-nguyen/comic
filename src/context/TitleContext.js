import React, { createContext, useContext, useState } from 'react';

const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
  const [titleData, setTitleData] = useState({});

  const updateTitleData = (slug, data) => {
    setTitleData((prev) => ({ ...prev, [slug]: data }));
  };

  return (
    <TitleContext.Provider value={{ titleData, updateTitleData }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitle = () => useContext(TitleContext);
