import { useQuery } from "@tanstack/react-query";
import {
  fetchGames,
  fetchTeams,
  Game,
  Team,
} from "../../components/fetch/fetch.tsx";

function Statistics() {
  const {
    data: games,
    isLoading: isLoadingGames,
    isError: isErrorGames,
  } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const {
    data: teams,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
  } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  if (isLoadingGames || isLoadingTeams) return <p>Loading...</p>;
  if (isErrorGames || isErrorTeams) return <p>Failed to fetch data.</p>;

  const lastGame = games?.[games.length - 1];

  const teamGoals = teams?.map((team) => {
    const totalGoals = games?.reduce((acc, game) => {
      if (game.team1Id === team.id) return acc + game.score.team1;
      if (game.team2Id === team.id) return acc + game.score.team2;
      return acc;
    }, 0);
    return { ...team, totalGoals: totalGoals || 0 };
  });

  const topTeams = teamGoals
    ?.sort((a, b) => b.totalGoals - a.totalGoals)
    .slice(0, 3);

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
      <div>
        <h2>Top 3 Teams by Goals</h2>
        <ul>
          {topTeams?.map((team) => (
            <li key={team.id}>
              {team.name}: {team.totalGoals} goals
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Statistics;
