import styled from "styled-components";

const FullScreenDiv = styled.div<{ isLightTheme: boolean }>`
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 10px;
  margin: 0;

  color: #222222;

  background-color: ${(props) => (props.isLightTheme ? "#3c8546" : "gray")};
`;

export default FullScreenDiv;
