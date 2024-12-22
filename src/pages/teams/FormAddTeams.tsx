import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTeam,
  fetchPlayers,
  Player,
  Team,
} from "../../components/fetch/fetch.tsx";
import {
  CloseButton,
  Form,
  FormWrapper,
  Input,
  Overlay,
} from "../players/Components/FormPlayerButton.styled.ts";
import { Select } from "./teams.styles.ts";
import styled from "styled-components";

interface FormTeamButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

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

const FormAddTeams: React.FC<FormTeamButtonProps> = ({ isOpen, setIsOpen }) => {
  const [teamName, setTeamName] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data: players, isLoading: isPlayersLoading } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });

  const mutation = useMutation<Team, Error, Omit<Team, "id">>({
    mutationFn: addTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });

      setTeamName("");
      setFoundedYear("");
      setLocation("");
      setSelectedPlayerIds([]);
    },
    onError: () => {
      alert("Failed to add team.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName || !foundedYear || !location) {
      alert("Please fill in all fields.");
      return;
    }

    mutation.mutate({
      name: teamName,
      foundedYear: parseInt(foundedYear, 10),
      location,
      players: selectedPlayerIds.map((id) => parseInt(id, 10)),
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
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
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
          <Select
            multiple
            value={selectedPlayerIds}
            onChange={(e) =>
              setSelectedPlayerIds(
                Array.from(e.target.selectedOptions, (option) => option.value),
              )
            }
          >
            {isPlayersLoading ? (
              <option>Loading players...</option>
            ) : (
              players
                ?.filter((player) => player.teamId === null)
                .map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.firstName} {player.lastName}
                  </option>
                ))
            )}
          </Select>
          <Button type="submit" isPending={mutation.status === "pending"}>
            {mutation.status === "pending" ? "Adding Team..." : "Add Team"}
          </Button>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default FormAddTeams;
