import styled from "styled-components";
import soccerField from "../screen/soccerfield.png";
const FullScreenDiv = styled.div<{ isLightTheme: boolean }>`
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 10px;
  margin: 0;
  color: #222222;
  background-color: ${(props) => (props.isLightTheme ? "#3c8546" : "gray")};
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${soccerField});
    background-position: left bottom;
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.1;
    pointer-events: none;
  }

  background-color: ${(props) => (props.isLightTheme ? "#3c8546" : "gray")};
`;

export default FullScreenDiv;
