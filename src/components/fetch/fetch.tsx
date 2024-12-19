export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: number | null;
}

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await fetch("http://localhost:3001/players");
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

  const response = await fetch("http://localhost:3001/players", {
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
