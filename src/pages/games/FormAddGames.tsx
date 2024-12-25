import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { addGame, fetchTeams, Team } from "../../components/fetch/fetch.tsx";

interface Game {
  id: string;
  title: string;
  date: string;
  location: string;
  duration: number;
  team1Id: string;
  team2Id: string;
  score: {
    team1: number;
    team2: number;
  };
}

interface FormAddGamesProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background-color: green;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
  border: 2px solid white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const ButtonEdit = styled.button<{ isPending: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.isPending ? "#ccc" : "#5cb85c")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.isPending ? "not-allowed" : "pointer")};
  font-size: 16px;
`;

const FormAddGames: React.FC<FormAddGamesProps> = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(0);
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);

  const queryClient = useQueryClient();

  const { data: teams, isLoading: isTeamsLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  const mutation = useMutation<Game, Error, Omit<Game, "id">>({
    mutationFn: addGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });

      setTitle("");
      setDate("");
      setLocation("");
      setDuration(0);
      setTeam1Id("");
      setTeam2Id("");
      setScoreTeam1(0);
      setScoreTeam2(0);
    },
    onError: () => {
      alert("Failed to add game.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !location || !team1Id || !team2Id) {
      alert("Please fill in all fields.");
      return;
    }

    mutation.mutate({
      title,
      date,
      location,
      duration,
      team1Id,
      team2Id,
      score: {
        team1: scoreTeam1,
        team2: scoreTeam2,
      },
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
          <Label>
            Title (e.g., "Season Opener")
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Label>
          <Label>
            Date (e.g., "2023-12-01")
            <Input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Label>
          <Label>
            Location (e.g., "New York Stadium")
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Label>
          <Label>
            Duration (minutes) (e.g., "90")
            <Input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </Label>
          <Label>
            Team 1
            <Select
              value={team1Id}
              onChange={(e) => setTeam1Id(e.target.value)}
              disabled={isTeamsLoading}
            >
              <option value="">Select Team 1</option>
              {teams?.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </Select>
          </Label>
          <Label>
            Team 2
            <Select
              value={team2Id}
              onChange={(e) => setTeam2Id(e.target.value)}
              disabled={isTeamsLoading}
            >
              <option value="">Select Team 2</option>
              {teams?.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </Select>
          </Label>
          <Label>
            Score Team 1 (e.g., "2")
            <Input
              type="number"
              placeholder="Score Team 1"
              value={scoreTeam1}
              onChange={(e) => setScoreTeam1(Number(e.target.value))}
            />
          </Label>
          <Label>
            Score Team 2 (e.g., "1")
            <Input
              type="number"
              placeholder="Score Team 2"
              value={scoreTeam2}
              onChange={(e) => setScoreTeam2(Number(e.target.value))}
            />
          </Label>
          <ButtonEdit type="submit" isPending={mutation.status === "pending"}>
            {mutation.status === "pending" ? "Adding Game..." : "Add Game"}
          </ButtonEdit>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default FormAddGames;
