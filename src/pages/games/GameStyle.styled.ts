import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

export const GameList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const GameItem = styled.div`
  padding: 10px;
  width: 80%;
  background-color: #f0ad4e;
  border: 1px solid #d9534f;
  border-radius: 5px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddGameButton = styled.button`
  padding: 10px 20px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
