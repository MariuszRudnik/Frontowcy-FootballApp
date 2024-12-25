import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGames, Game } from "../../components/fetch/fetch.tsx";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

const GameList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const GameItem = styled.div`
  padding: 10px;
  width: 80%;
  background-color: #f0ad4e;
  border: 1px solid #d9534f;
  border-radius: 5px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GamesList: React.FC = () => {
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  return (
    <Wrapper>
      <TopWrapper>
        <h1>Games List</h1>
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
            </div>
            <div>
              <p>
                Score: {game.score.team1} - {game.score.team2}
              </p>
              <p>
                Teams: {game.team1Id} vs {game.team2Id}
              </p>
            </div>
          </GameItem>
        ))}
      </GameList>
    </Wrapper>
  );
};

export default GamesList;
