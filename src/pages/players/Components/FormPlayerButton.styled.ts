import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  position: relative;
  background-color: green;
  border: 2px solid white;
  padding: 40px 20px 20px 20px;
  border-radius: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const Button = styled.button<{ isPending: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${(props) => (props.isPending ? "#ccc" : "#6cccac")};
  border: none;
  font-size: 16px;
  cursor: ${(props) => (props.isPending ? "not-allowed" : "pointer")};
  color: #fff;

  &:hover {
    background-color: ${(props) => (props.isPending ? "#ccc" : "#57a68b")};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
`;
