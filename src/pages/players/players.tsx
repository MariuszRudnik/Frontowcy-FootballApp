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
import FormAddPlayers from "./Components/formAddPlayers.tsx";
import FormUpdatePlayer from "./Components/FormUpdatePlayer.tsx";
import {
  ButtonWrapper,
  EditButton,
} from "./Components/FormPlayerButton.styled.ts";

import { BiSolidEdit } from "react-icons/bi";
import DeletePlayerButton from "./Components/DeleteButton.tsx";

const PlayersList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const {
    data: players,
    isLoading,
    isError,
  } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });

  const handleEditClick = (playerId: string) => {
    setSelectedPlayerId(playerId);
    setShowUpdateForm(true);
  };

  return (
    <Wrapper>
      {showForm && <FormAddPlayers isOpen={showForm} setIsOpen={setShowForm} />}
      {showUpdateForm && selectedPlayerId && (
        <FormUpdatePlayer
          isOpen={showUpdateForm}
          setIsOpen={setShowUpdateForm}
          playerId={selectedPlayerId}
        />
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
            <ButtonWrapper>
              <EditButton onClick={() => handleEditClick(player.id)}>
                Edit <BiSolidEdit />
              </EditButton>

              <DeletePlayerButton playerId={player.id} />
            </ButtonWrapper>
          </PlayerItem>
        ))}
      </PlayerList>
    </Wrapper>
  );
};

export default PlayersList;
