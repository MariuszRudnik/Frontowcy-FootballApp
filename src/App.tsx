import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import FullScreenDiv from "./components/layout/ColorTheme.tsx";
import { ThemeSwitchButton } from "./components/layout/ThemeButton.tsx";
import ViewSwitcher from "./components/layout/ViewSwitcher.tsx";

const queryClient = new QueryClient();
function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FullScreenDiv isLightTheme={isLightTheme}>
          <ThemeSwitchButton
            isLightTheme={isLightTheme}
            setIsLightTheme={setIsLightTheme}
          />
          <ViewSwitcher />
        </FullScreenDiv>
      </QueryClientProvider>
    </>
  );
}

export default App;
