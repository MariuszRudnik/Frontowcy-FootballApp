import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTeamById,
  updateTeam,
  Team,
} from "../../../components/fetch/fetch.tsx";
import {
  Overlay,
  FormWrapper,
  CloseButton,
  Form,
  Input,
  ButtonEdit,
} from "../../players/Components/FormPlayerButton.styled.ts";

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
  const [players, setPlayers] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data: team } = useQuery<Team>({
    queryKey: ["team", teamId],
    queryFn: () => fetchTeamById(teamId),
    enabled: isOpen,
  });

  useEffect(() => {
    if (team) {
      setName(team.name);
      setFoundedYear(team.foundedYear ? team.foundedYear.toString() : "");
      setLocation(team.location);
      setPlayers(team.players ? team.players.map(String) : []);
    }
  }, [team]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !foundedYear || !location) {
      alert("Please fill in all fields.");
      return;
    }

    mutation.mutate({
      id: teamId,
      name,
      foundedYear: parseInt(foundedYear, 10),
      location,
      players,
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
          <ButtonEdit type="submit" isPending={mutation.status === "pending"}>
            {mutation.status === "pending" ? "Updating Team..." : "Update Team"}
          </ButtonEdit>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default FormUpdateTeam;
