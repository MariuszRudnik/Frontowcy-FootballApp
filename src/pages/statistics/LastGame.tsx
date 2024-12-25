import { Game } from "../../components/fetch/fetch.tsx";

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
    <div>
      <h1>Statistics</h1>
      {lastGame ? (
        <ul>
          <li>Title: {lastGame.title}</li>
          <li>Date: {lastGame.date}</li>
          <li>Location: {lastGame.location}</li>
          <li>Duration: {lastGame.duration} minutes</li>
          <li>
            Score: {lastGame.score.team1} - {lastGame.score.team2}
          </li>
        </ul>
      ) : (
        <p>No games played yet.</p>
      )}
    </div>
  );
}

export default LastGame;
