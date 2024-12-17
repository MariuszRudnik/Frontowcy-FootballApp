import styled from "styled-components";

const FullScreenDiv = styled.div<{ isLightTheme: boolean }>`
  width: 100vw;
  height: 100vh;
  color: #222222;
  margin: 0;
  background-color: ${(props) => (props.isLightTheme ? "#3c8546" : "gray")};
`;

export default FullScreenDiv;
