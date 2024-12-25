import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTeamById,
  updateTeam,
  fetchPlayers,
  updatePlayer,
  Team,
  Player,
} from "../../../components/fetch/fetch.tsx";
import {
  Overlay,
  FormWrapper,
  CloseButton,
  Form,
  Input,
  ButtonEdit,
  DeleteButton,
} from "../../players/Components/FormPlayerButton.styled.ts";
import { ListPlayers } from "./FontUpdateTeam.styled.ts";

interface FormUpdateTeamProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  teamId: string;
}

const FormUpdateTeam: React.FC<FormUpdateTeamProps> = ({
  isOpen,
  setIsOpen,
  teamId,
}) => {
  const [name, setName] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [location, setLocation] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [removedPlayers, setRemovedPlayers] = useState<Player[]>([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data: team } = useQuery<Team>({
    queryKey: ["team", teamId],
    queryFn: () => fetchTeamById(teamId),
    enabled: isOpen,
  });

  const { data: allPlayers } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: fetchPlayers,
    enabled: isOpen,
  });

  useEffect(() => {
    if (team) {
      setName(team.name);
      setFoundedYear(team.foundedYear ? team.foundedYear.toString() : "");
      setLocation(team.location);
    }
    if (allPlayers) {
      const teamPlayers = allPlayers.filter(
        (player) => player.teamId === teamId,
      );
      setPlayers(teamPlayers);
    }
  }, [team, allPlayers, teamId]);

  const mutation = useMutation<Team, Error, Team>({
    mutationFn: updateTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      setIsOpen(false);
    },
    onError: () => {
      alert("Failed to update team.");
    },
  });

  const updatePlayerMutation = useMutation<Player, Error, Player>({
    mutationFn: updatePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
    onError: () => {
      alert("Failed to update player.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !foundedYear || !location) {
      alert("Please fill in all fields.");
      return;
    }

    removedPlayers.forEach((player) => {
      updatePlayerMutation.mutate({ ...player, teamId: null });
    });

    selectedPlayerIds.forEach((playerId) => {
      const player = allPlayers?.find((p) => p.id === playerId);
      if (player) {
        updatePlayerMutation.mutate({ ...player, teamId });
      }
    });

    mutation.mutate({
      id: teamId,
      name,
      foundedYear: parseInt(foundedYear, 10),
      location,
      players: players.map((player) => player.id),
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeletePlayer = (playerId: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== playerId),
    );
    const removedPlayer = players.find((player) => player.id === playerId);
    if (removedPlayer) {
      setRemovedPlayers((prevRemovedPlayers) => [
        ...prevRemovedPlayers,
        removedPlayer,
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
      <FormWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Founded Year"
            value={foundedYear}
            onChange={(e) => setFoundedYear(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div>
            <h3>Added players</h3>
            <ul>
              {players.map((player) => (
                <ListPlayers key={player.id}>
                  {player.firstName} {player.lastName}{" "}
                  <DeleteButton onClick={() => handleDeletePlayer(player.id)}>
                    Delete
                  </DeleteButton>
                </ListPlayers>
              ))}
            </ul>
          </div>
          <div>
            <h3>Unassigned players</h3>
            <select
              multiple
              value={selectedPlayerIds}
              onChange={(e) =>
                setSelectedPlayerIds(
                  Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                  ),
                )
              }
            >
              {allPlayers
                ?.filter((player) => player.teamId === null)
                .map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.firstName} {player.lastName}
                  </option>
                ))}
            </select>
          </div>
          <ButtonEdit type="submit" isPending={mutation.status === "pending"}>
            {mutation.status === "pending" ? "Updating Team..." : "Update Team"}
          </ButtonEdit>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default FormUpdateTeam;
