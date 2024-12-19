import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  CloseButton,
  Form,
  FormWrapper,
  Input,
  Overlay,
} from "./FormPlayerButton.styled.ts";
import { addPlayer } from "../../../components/fetch/fetch.tsx";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: number | null;
}

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
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
      <FormWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>X</CloseButton>
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
