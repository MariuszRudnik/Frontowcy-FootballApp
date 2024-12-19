import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayers, Player } from "../../components/fetch/fetch.tsx";
import {
  AddPlayerButton,
  ErrorMessage,
  PlayerItem,
  PlayerList,
  TopWrapper,
  Wrapper,
} from "./playersStyled.styled.ts";
import FormPlayerButton from "./Components/formAddPlayers.tsx";

const PlayersList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    data: players,
    isLoading,
    isError,
  } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });

  return (
    <Wrapper>
      {showForm && (
        <FormPlayerButton isOpen={showForm} setIsOpen={setShowForm} />
      )}
      <TopWrapper>
        <AddPlayerButton onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Player"}
        </AddPlayerButton>
        <h1>Players List</h1>
      </TopWrapper>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <ErrorMessage>
          Failed to fetch players. Please try again later.
        </ErrorMessage>
      )}

      <PlayerList>
        {players?.map((player) => (
          <PlayerItem key={player.id}>
            {player.firstName} {player.lastName} (Team ID:{" "}
            {player.teamId ?? "None"})
          </PlayerItem>
        ))}
      </PlayerList>
    </Wrapper>
  );
};

export default PlayersList;
