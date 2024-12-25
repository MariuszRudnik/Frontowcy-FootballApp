import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import FullScreenDiv from "./components/layout/ColorTheme.tsx";
import { ThemeSwitchButton } from "./components/layout/ThemeButton.tsx";
import ViewSwitcher from "./components/layout/ViewSwitcher.tsx";

const queryClient = new QueryClient();
function App() {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <FullScreenDiv isLightTheme={isLightTheme}>
          <ThemeSwitchButton
            isLightTheme={isLightTheme}
            setIsLightTheme={setIsLightTheme}
          />
          <ViewSwitcher />
        </FullScreenDiv>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
