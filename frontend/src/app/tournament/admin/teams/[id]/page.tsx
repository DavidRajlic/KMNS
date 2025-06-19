"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Player = {
  _id: string;
  name: string;
  goals: number;
  yellow_cards: number;
  red_cards: number;
  team_id: string;
};

type Team = {
  _id: string;
  name: string;
};

export default function TeamPlayersPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.id as string;

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`http://localhost:4000/teams/${teamId}`);
      if (!res.ok) throw new Error("Napaka pri pridobivanju ekipe");
      const data = await res.json();
      setTeam(data);
    } catch (err) {
      console.error(err);
      setError("Ni mogoče naložiti ekipe.");
    }
  };

  const fetchPlayers = async () => {
    try {
      const res = await fetch(`http://localhost:4000/players/team/${teamId}`);
      if (!res.ok) throw new Error("Napaka pri pridobivanju igralcev");
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error(err);
      setError("Ni mogoče naložiti igralcev.");
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchTeam();
      fetchPlayers();
    }
  }, [teamId]);

  const handleAddPlayer = async () => {
    if (!playerNameInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:4000/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerNameInput,
          goals: 0,
          yellow_cards: 0,
          red_cards: 0,
          team_id: teamId,
          team_name: team?.name,
        }),
      });

      if (!res.ok) throw new Error("Napaka pri dodajanju igralca.");

      setPlayerNameInput("");
      await fetchPlayers();
    } catch (err) {
      console.error(err);
      setError("Igralec ni bil dodan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    try {
      const res = await fetch(`http://localhost:4000/players/${playerId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Napaka pri brisanju igralca.");

      await fetchPlayers();
    } catch (err) {
      console.error(err);
      setError("Ni bilo mogoče izbrisati igralca.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition"
        >
          ← Nazaj
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">
          {team ? `Igralci ekipe ${team.name}` : "Nalaganje..."}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Vpiši ime igralca"
          value={playerNameInput}
          onChange={(e) => setPlayerNameInput(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddPlayer}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Dodajanje..." : "Dodaj igralca"}
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-sm mb-6 text-center font-medium">
          {error}
        </div>
      )}

      <div>
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
          <thead>
            <tr className="bg-blue-50 text-gray-700 text-left">
              <th className="py-3 px-6 font-medium">Ime igralca</th>
              <th className="py-3 px-6 font-medium text-center">⚽</th>
              <th className="py-3 px-6 font-medium text-center">🟨</th>
              <th className="py-3 px-6 font-medium text-center">🟥</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Ni dodanih igralcev.
                </td>
              </tr>
            ) : (
              players.map((player) => (
                <tr
                  key={player._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6 font-semibold">{player.name}</td>
                  <td className="py-3 px-6 text-center">{player.goals}</td>
                  <td className="py-3 px-6 text-center">
                    {player.yellow_cards}
                  </td>
                  <td className="py-3 px-6 text-center">{player.red_cards}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleDeletePlayer(player._id)}
                      className="text-red-600 hover:text-red-800 font-bold text-2xl"
                      aria-label={`Izbriši igralca ${player.name}`}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
