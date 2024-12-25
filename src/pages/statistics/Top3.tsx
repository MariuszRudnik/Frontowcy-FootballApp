import { Game, Team } from "../../components/fetch/fetch.tsx";

interface Props {
  teams: Team[] | undefined;
  games: Game[] | undefined;
}

function Top3({ teams, games }: Props) {
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

export default Top3;
