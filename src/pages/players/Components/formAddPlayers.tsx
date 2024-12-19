import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: number | null;
}

const addPlayer = async (player: Omit<Player, "id">): Promise<Player> => {
  const newPlayer = {
    ...player,
    id: Date.now().toString(),
  };

  const response = await fetch("http://localhost:3001/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlayer),
  });

  if (!response.ok) {
    throw new Error("Failed to add player.");
  }

  return response.json();
};

// Styled components
const Overlay = styled.div`
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

const FormWrapper = styled.div`
  background-color: green;
  border: 2px solid white;
  padding: 20px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button<{ isPending: boolean }>`
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

interface FormPlayerButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FormPlayerButton: React.FC<FormPlayerButtonProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation<Player, Error, Omit<Player, "id">>({
    mutationFn: addPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });

      setFirstName("");
      setLastName("");
    },
    onError: () => {
      alert("Failed to add player.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      alert("Please fill in both fields.");
      return;
    }

    mutation.mutate({
      firstName,
      lastName,
      teamId: null,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
      <FormWrapper onClick={(e) => e.stopPropagation()}>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button type="submit" isPending={mutation.status === "pending"}>
            {mutation.status === "pending" ? "Adding Player..." : "Add Player"}
          </Button>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default FormPlayerButton;
