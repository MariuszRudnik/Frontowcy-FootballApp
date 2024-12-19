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
