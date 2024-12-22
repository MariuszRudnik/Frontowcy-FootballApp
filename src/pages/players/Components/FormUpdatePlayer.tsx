import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  CloseButton,
  Form,
  FormWrapper,
  Input,
  Overlay,
} from "./FormPlayerButton.styled.ts";
import {
  fetchPlayerById,
  updatePlayer,
} from "../../../components/fetch/fetch.tsx";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: number | null;
}

interface FormUpdatePlayerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  playerId: string;
}

const FormUpdatePlayer: React.FC<FormUpdatePlayerProps> = ({
  isOpen,
  setIsOpen,
  playerId,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const queryClient = useQueryClient();

  const { data: player } = useQuery<Player>({
    queryKey: ["player", playerId],
    queryFn: () => fetchPlayerById(playerId),
    enabled: isOpen,
  });

  useEffect(() => {
    if (player) {
      setFirstName(player.firstName);
      setLastName(player.lastName);
    }
  }, [player]);

  const mutation = useMutation<Player, Error, Player>({
    mutationFn: updatePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      setIsOpen(false);
    },
    onError: () => {
      alert("Failed to update player.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      alert("Please fill in both fields.");
      return;
    }

    mutation.mutate({
      id: playerId,
      firstName,
      lastName,
      teamId: player?.teamId ?? null,
    });
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
            {mutation.status === "pending"
              ? "Updating Player..."
              : "Update Player"}
          </Button>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default FormUpdatePlayer;
