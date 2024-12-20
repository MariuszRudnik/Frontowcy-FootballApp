import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteButton } from "./FormPlayerButton.styled.ts";
import { RiDeleteBinLine } from "react-icons/ri";
import { deletePlayer } from "../../../components/fetch/fetch.tsx";

interface DeletePlayerButtonProps {
  playerId: string;
}

const DeletePlayerButton: React.FC<DeletePlayerButtonProps> = ({
  playerId,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deletePlayer(playerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
    onError: () => {
      alert("Failed to delete player.");
    },
  });

  return (
    <DeleteButton onClick={() => mutation.mutate()}>
      Delete
      <RiDeleteBinLine />
    </DeleteButton>
  );
};

export default DeletePlayerButton;
