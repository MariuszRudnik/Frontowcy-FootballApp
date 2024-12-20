import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  margin: 20px;
  position: relative;
`;

export const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const PlayerItem = styled.div`
  padding: 10px;
  width: 80%;
  background-color: #6cccac;
  border: 1px solid #227826;
  border-radius: 5px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-content: center;

  &:hover {
    background-color: rgba(244, 253, 195, 0.15);
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;

export const AddPlayerButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #6cccac;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: #57a68b;
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
