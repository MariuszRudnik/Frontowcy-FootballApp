import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteButton } from "../../players/Components/FormPlayerButton.styled.ts";
import {
  deleteTeam,
  fetchGames,
  Game,
} from "../../../components/fetch/fetch.tsx";

interface DeleteTeamButtonProps {
  teamId: string;
}

const DeleteTeamButton: React.FC<DeleteTeamButtonProps> = ({ teamId }) => {
  const queryClient = useQueryClient();

  const { data: games } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: () => {
      alert("Failed to delete team.");
    },
  });

  const handleDeleteClick = () => {
    const isTeamInGame = games?.some(
      (game) => game.team1Id === teamId || game.team2Id === teamId,
    );

    if (isTeamInGame) {
      alert(
        "This team cannot be deleted because it has participated in games.",
      );
      return;
    }

    if (window.confirm("Are you sure you want to delete this team?")) {
      deleteMutation.mutate(teamId);
    }
  };

  return <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>;
};
export default DeleteTeamButton;
