import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

const LightModeContext = createContext<
  | {
      light: boolean;
      setLight: Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useLightMode = () => {
  const context = useContext(LightModeContext);
  if (!context) {
    throw new Error("useLightMode must be used within a LightModeProvider");
  }
  return context;
};

export const LightModeProvider = ({ children }: { children: ReactNode }) => {
  const [light, setLight] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("light-mode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem("light-mode", JSON.stringify(light));
  }, [light]);

  return (
    <LightModeContext.Provider value={{ light, setLight }}>
      {children}
    </LightModeContext.Provider>
  );
};
