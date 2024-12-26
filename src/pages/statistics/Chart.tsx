import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGames,
  fetchTeams,
  Game,
  Team,
} from "../../components/fetch/fetch.tsx";
import { Bar } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DivSpaceStatistics, DivStatistics } from "./Statistics.styled.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = () => {
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

  const [interval, setInterval] = useState<"day" | "month" | "year">("day");

  if (isLoadingGames || isLoadingTeams) return <p>Loading...</p>;
  if (isErrorGames || isErrorTeams) return <p>Failed to fetch data.</p>;

  const teamNames = teams?.reduce(
    (acc, team) => {
      acc[team.id] = team.name;
      return acc;
    },
    {} as Record<string, string>,
  );

  const groupedGoals = games?.reduce(
    (acc, game) => {
      const gameDate = new Date(game.date);
      let key;
      if (interval === "day") {
        key = gameDate.toISOString().split("T")[0];
      } else if (interval === "month") {
        key = `${gameDate.getFullYear()}-${gameDate.getMonth() + 1}`;
      } else {
        key = `${gameDate.getFullYear()}`;
      }
      if (!acc[key]) acc[key] = {};
      if (!acc[key][game.team1Id]) acc[key][game.team1Id] = 0;
      if (!acc[key][game.team2Id]) acc[key][game.team2Id] = 0;
      acc[key][game.team1Id] += game.score.team1;
      acc[key][game.team2Id] += game.score.team2;
      return acc;
    },
    {} as Record<string, Record<string, number>>,
  );

  const chartData = {
    labels: Object.keys(groupedGoals || {}),
    datasets: Object.keys(groupedGoals ?? {}).map((key) => ({
      label: key,
      data: Object.entries(groupedGoals?.[key] ?? {}).map(
        ([teamId, goals]) => ({
          x: teamNames?.[teamId] ?? teamId,
          y: goals,
        }),
      ),
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    })),
  };

  return (
    <DivSpaceStatistics>
      <DivStatistics>
        <h1>Chart</h1>
        <div>
          <button onClick={() => setInterval("day")}>Day</button>
          <button onClick={() => setInterval("month")}>Month</button>
          <button onClick={() => setInterval("year")}>Year</button>
        </div>
        <Bar data={chartData} />
      </DivStatistics>
    </DivSpaceStatistics>
  );
};

export default Chart;
