import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ButtonEdit,
  CloseButton,
  Form,
  FormWrapper,
  Input,
  Overlay,
} from "../players/Components/FormPlayerButton.styled.ts";
import {
  fetchGameById,
  updateGame,
  fetchTeams,
  Game as FetchGame,
  Team,
} from "../../components/fetch/fetch.tsx";

interface FormUpdateGameProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  gameId: string;
}

const FormUpdateGame: React.FC<FormUpdateGameProps> = ({
  isOpen,
  setIsOpen,
  gameId,
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);

  const queryClient = useQueryClient();

  const { data: game } = useQuery<FetchGame>({
    queryKey: ["game", gameId],
    queryFn: () => fetchGameById(gameId),
    enabled: isOpen,
  });

  const { data: teams } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  useEffect(() => {
    if (game) {
      setTitle(game.title);
      setDate(game.date);
      setLocation(game.location);
      setDuration(game.duration);
      setTeam1Id(game.team1Id);
      setTeam2Id(game.team2Id);
      setScoreTeam1(game.score.team1);
      setScoreTeam2(game.score.team2);
    }
  }, [game]);

  const mutation = useMutation<FetchGame, Error, FetchGame>({
    mutationFn: updateGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      setIsOpen(false);
    },
    onError: () => {
      alert("Failed to update game.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !location || duration === null) {
      alert("Please fill in all fields.");
      return;
    }

    mutation.mutate({
      id: gameId,
      title,
      date,
      location,
      duration,
      score: { team1: scoreTeam1, team2: scoreTeam2 },
      team1Id,
      team2Id,
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
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Duration"
            value={duration ?? ""}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <select value={team1Id} onChange={(e) => setTeam1Id(e.target.value)}>
            {teams?.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <select value={team2Id} onChange={(e) => setTeam2Id(e.target.value)}>
            {teams?.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <Input
            type="number"
            placeholder="Score Team 1"
            value={scoreTeam1}
            onChange={(e) => setScoreTeam1(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Score Team 2"
            value={scoreTeam2}
            onChange={(e) => setScoreTeam2(Number(e.target.value))}
          />
          <ButtonEdit type="submit" isPending={mutation.status === "pending"}>
            {mutation.status === "pending" ? "Updating Game..." : "Update Game"}
          </ButtonEdit>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default FormUpdateGame;
