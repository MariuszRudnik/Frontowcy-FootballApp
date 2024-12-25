export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: number | string | null;
}
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await fetch(`${BASE_URL}/players`);
  if (!response.ok) {
    throw new Error("Failed to fetch players.");
  }
  return response.json();
};

export const addPlayer = async (
  player: Omit<Player, "id">,
): Promise<Player> => {
  const newPlayer = {
    ...player,
    id: Date.now().toString(),
  };

  const response = await fetch(`${BASE_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlayer),
  });

  if (!response.ok) {
    throw new Error("Failed to add player.");
  }

  return response.json();
};

export const deletePlayer = async (id: string): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/players/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete player.");
  }
};

export const fetchPlayerById = async (id: string): Promise<Player> => {
  const response = await fetch(`${BASE_URL}/players/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch player.");
  }
  return response.json();
};

export const updatePlayer = async (player: Player): Promise<Player> => {
  const response = await fetch(`${BASE_URL}/players/${player.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  });

  if (!response.ok) {
    throw new Error("Failed to update player.");
  }

  return response.json();
};

export const fetchTeams = async (): Promise<Team[]> => {
  const response = await fetch(`${BASE_URL}/teams`);
  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }
  return response.json();
};

export interface Team {
  id: string;
  name: string;
  foundedYear: number;
  location: string;
  teamId?: string;
  players: number[] | string[];
}

export const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch(`${BASE_URL}/games`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};

export interface Game {
  id: string;
  title: string;
  date: string;
  location: string;
  duration: number;
  score: {
    team1: number;
    team2: number;
  };
  team1Id: string;
  team2Id: string;
}

export const addTeam = async (team: Omit<Team, "id">): Promise<Team> => {
  const response = await fetch(`${BASE_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });

  if (!response.ok) {
    throw new Error("Failed to add team");
  }

  const newTeam = await response.json();

  await Promise.all(
    team.players.map(async (playerId) => {
      const playerResponse = await fetch(`${BASE_URL}/players/${playerId}`);
      if (!playerResponse.ok) {
        throw new Error("Failed to fetch player");
      }
      const player = await playerResponse.json();
      player.teamId = newTeam.id;

      await fetch(`${BASE_URL}/players/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });
    }),
  );

  return newTeam;
};

export const deleteTeam = async (teamId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/teams/${teamId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete team");
  }
};

export const fetchTeamById = async (teamId: string): Promise<Team> => {
  const response = await fetch(`${BASE_URL}/teams/${teamId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch team");
  }
  return response.json();
};

export const updateTeam = async (team: Team): Promise<Team> => {
  const response = await fetch(`${BASE_URL}/teams/${team.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
  if (!response.ok) {
    throw new Error("Failed to update team");
  }
  return response.json();
};

export const addGame = async (game: Omit<Game, "id">): Promise<Game> => {
  const newGame = {
    ...game,
    id: Date.now().toString(),
  };

  const response = await fetch(`${BASE_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  });

  if (!response.ok) {
    throw new Error("Failed to add game.");
  }

  return response.json();
};
