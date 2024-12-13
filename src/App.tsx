import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import styled from "styled-components";

const ThemeButton = styled.button<{ isLightTheme: boolean }>`
  background-color: ${(props) => (props.isLightTheme ? "blue" : "black")};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
`;

const queryClient = new QueryClient();
function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className={`App ${isLightTheme ? "light" : "dark"}`}>
          <ThemeButton
            isLightTheme={isLightTheme}
            onClick={() => setIsLightTheme(!isLightTheme)}
          >
            <MdOutlineLightMode />
          </ThemeButton>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
