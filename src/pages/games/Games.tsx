import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchGames,
  fetchTeams,
  deleteGame,
  Game,
  Team,
} from "../../components/fetch/fetch.tsx";
import FormAddGames from "./FormAddGames.tsx";
import { EditButton } from "../players/Components/FormPlayerButton.styled.ts";
import FormUpdateGame from "./ FormUpdateGame.tsx";
import {
  AddGameButton,
  DeleteButton,
  ErrorMessage,
  GameItem,
  GameList,
  TopWrapper,
  Wrapper,
  WrapperButton,
} from "./GameStyle.styled.ts";

const GamesList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: games,
    isLoading,
    isError,
  } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const { data: teams } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
    onError: () => {
      alert("Failed to delete game.");
    },
  });

  const handleEditClick = (gameId: string) => {
    setSelectedGameId(gameId);
    setShowUpdateForm(true);
  };

  const handleDeleteClick = (gameId: string) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      deleteMutation.mutate(gameId);
    }
  };

  const getTeamName = (teamId: string) => {
    return teams?.find((team) => team.id === teamId)?.name || "Unknown Team";
  };

  return (
    <Wrapper>
      {showForm && <FormAddGames isOpen={showForm} setIsOpen={setShowForm} />}
      {showUpdateForm && selectedGameId && (
        <FormUpdateGame
          isOpen={showUpdateForm}
          setIsOpen={setShowUpdateForm}
          gameId={selectedGameId}
        />
      )}
      <TopWrapper>
        <h1>Games List</h1>
        <AddGameButton onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Game"}
        </AddGameButton>
      </TopWrapper>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <ErrorMessage>
          Failed to fetch games. Please try again later.
        </ErrorMessage>
      )}

      <GameList>
        {games?.map((game) => (
          <GameItem key={game.id}>
            <div>
              <strong>{game.title}</strong>
              <p>
                Date: {game.date} | Location: {game.location}
              </p>
              <p>Duration: {game.duration} minutes</p>
              <div>
                <p>
                  Score: {game.score.team1} - {game.score.team2}
                </p>
                <p>
                  Teams: {getTeamName(game.team1Id)} vs{" "}
                  {getTeamName(game.team2Id)}
                </p>
              </div>
            </div>

            <WrapperButton>
              <EditButton onClick={() => handleEditClick(game.id)}>
                Edit
              </EditButton>
              <DeleteButton onClick={() => handleDeleteClick(game.id)}>
                Delete
              </DeleteButton>
            </WrapperButton>
          </GameItem>
        ))}
      </GameList>
    </Wrapper>
  );
};

export default GamesList;
