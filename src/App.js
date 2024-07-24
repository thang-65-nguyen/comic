import "./App.css";
import { TitleProvider } from "./context/TitleContext";

import { AuthProvider } from "./context/AuthContext";
import Routing from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <TitleProvider>
        <Routing />
      </TitleProvider>
    </AuthProvider>
  );
}

export default App;
