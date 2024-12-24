import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteButton } from "../../players/Components/FormPlayerButton.styled.ts";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteTeam } from "../../../components/fetch/fetch.tsx";

interface DeleteTeamButtonProps {
  teamId: string;
}

const DeleteTeamButton: React.FC<DeleteTeamButtonProps> = ({ teamId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: () => {
      alert("Failed to delete team.");
    },
  });

  return (
    <DeleteButton onClick={() => mutation.mutate()}>
      Delete
      <RiDeleteBinLine />
    </DeleteButton>
  );
};

export default DeleteTeamButton;
