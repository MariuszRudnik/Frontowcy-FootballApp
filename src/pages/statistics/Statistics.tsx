import { useQuery } from "@tanstack/react-query";
import {
  fetchGames,
  fetchTeams,
  Game,
  Team,
} from "../../components/fetch/fetch.tsx";
import LastGame from "./LastGame.tsx";
import Top3 from "./Top3.tsx";
import Chart from "./Chart.tsx";
import { StatisticsStyled } from "./Statistics.styled.tsx";

function Statistics() {
  const {
    data: teams,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
  } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });
  const {
    data: games,
    isLoading: isLoadingGames,
    isError: isErrorGames,
  } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  return (
    <StatisticsStyled>
      <LastGame
        games={games}
        isErrorGames={isErrorGames}
        isLoadingGames={isLoadingGames}
        isErrorTeams={isErrorTeams}
        isLoadingTeams={isLoadingTeams}
      />
      <Top3 teams={teams} games={games} />
      <Chart />
    </StatisticsStyled>
  );
}

export default Statistics;
