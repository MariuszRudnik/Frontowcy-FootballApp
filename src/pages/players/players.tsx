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
import {
  ButtonWrapper,
  DeleteButton,
  EditButton,
} from "./Components/FormPlayerButton.styled.ts";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

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
            <ButtonWrapper>
              <EditButton>
                Edit <BiSolidEdit />
              </EditButton>
              <DeleteButton>
                Delete
                <RiDeleteBinLine />
              </DeleteButton>
            </ButtonWrapper>
          </PlayerItem>
        ))}
      </PlayerList>
    </Wrapper>
  );
};

export default PlayersList;
