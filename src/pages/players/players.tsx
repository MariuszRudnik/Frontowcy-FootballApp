import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: number | null;
}

const Wrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PlayerItem = styled.div`
  padding: 10px;
  width: 80%;
  background-color: #6cccac;
  border: 1px solid #227826;
  border-radius: 5px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(244, 253, 195, 0.15);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;

const PlayersList: React.FC = () => {
  const fetchPlayers = async (): Promise<Player[]> => {
    const response = await fetch("http://localhost:3001/players");
    if (!response.ok) {
      throw new Error("Failed to fetch players.");
    }
    return response.json();
  };

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
      <h1>Players List</h1>
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
