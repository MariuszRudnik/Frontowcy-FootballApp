import { Game, Team } from "../../components/fetch/fetch.tsx";
import {
  DivStatistics,
  ListLiStatistics,
  ListUlStatistics,
} from "./Statistics.styled.tsx";

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
    <DivStatistics>
      <div>
        <h2>Top 3 Teams by Goals</h2>
        <ListUlStatistics>
          {topTeams?.map((team) => (
            <ListLiStatistics key={team.id}>
              {team.name}: {team.totalGoals} goals
            </ListLiStatistics>
          ))}
        </ListUlStatistics>
      </div>
    </DivStatistics>
  );
}

export default Top3;
