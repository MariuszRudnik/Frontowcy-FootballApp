import styled from "styled-components";
import { MdOutlineLightMode } from "react-icons/md";

export const ThemeButton = styled.button<{ isLightTheme: boolean }>`
  background-color: ${(props) => (props.isLightTheme ? "#2b513e" : "black")};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 10px;
`;

interface ThemeSwitchButtonProps {
  isLightTheme: boolean;
  setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeSwitchButton = ({
  isLightTheme,
  setIsLightTheme,
}: ThemeSwitchButtonProps) => {
  return (
    <ThemeButton
      isLightTheme={isLightTheme}
      onClick={() => setIsLightTheme(!isLightTheme)}
    >
      <MdOutlineLightMode />
    </ThemeButton>
  );
};
