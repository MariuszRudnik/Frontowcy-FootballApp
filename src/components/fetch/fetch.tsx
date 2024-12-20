export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: number | null;
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
