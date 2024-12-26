import { Game } from "../../components/fetch/fetch.tsx";
import {
  DivStatistics,
  ListLiStatistics,
  ListUlStatistics,
} from "./Statistics.styled.tsx";

interface Props {
  games: Game[] | undefined;
  isLoadingGames: boolean;
  isErrorGames: boolean;
  isLoadingTeams: boolean;
  isErrorTeams: boolean;
}

function LastGame({
  games,
  isLoadingGames,
  isErrorGames,
  isLoadingTeams,
  isErrorTeams,
}: Props) {
  if (isLoadingGames || isLoadingTeams) return <p>Loading...</p>;
  if (isErrorGames || isErrorTeams) return <p>Failed to fetch data.</p>;

  const lastGame = games?.[games.length - 1];
  return (
    <DivStatistics>
      <h1>Last Game</h1>
      {lastGame ? (
        <ListUlStatistics>
          <ListLiStatistics>Title: {lastGame.title}</ListLiStatistics>
          <ListLiStatistics>Date: {lastGame.date}</ListLiStatistics>
          <ListLiStatistics>Location: {lastGame.location}</ListLiStatistics>
          <ListLiStatistics>
            Duration: {lastGame.duration} minutes
          </ListLiStatistics>
          <ListLiStatistics>
            Score: {lastGame.score.team1} - {lastGame.score.team2}
          </ListLiStatistics>
        </ListUlStatistics>
      ) : (
        <p>No games played yet.</p>
      )}
    </DivStatistics>
  );
}

export default LastGame;
