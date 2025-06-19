"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Team = {
  _id: string;
  name: string;
};

export default function TeamsPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamNameInput, setTeamNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:4000/teams");
      if (!res.ok) throw new Error("Napaka pri pridobivanju ekip");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error(err);
      setError("Ni mogoče naložiti ekip.");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAddTeam = async () => {
    if (!teamNameInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:4000/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: teamNameInput }),
      });

      if (!res.ok) throw new Error("Napaka pri pošiljanju ekipe.");

      setTeamNameInput("");
      await fetchTeams();
    } catch (err) {
      console.error(err);
      setError("Ekipa ni bila ustvarjena.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prepreči navigacijo, ko kliknemo delete

    try {
      const res = await fetch(`http://localhost:4000/teams/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Napaka pri brisanju ekipe.");

      await fetchTeams();
    } catch (err) {
      console.error(err);
      setError("Ni bilo mogoče izbrisati ekipe.");
    }
  };

  const handleTeamClick = (teamId: string) => {
    router.push(`teams/${teamId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Seznam ekip</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Vpiši ime ekipe"
          value={teamNameInput}
          onChange={(e) => setTeamNameInput(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTeam}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Dodajanje..." : "Dodaj"}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <ul className="grid grid-cols-1 gap-3">
        {teams.map((team) => (
          <li
            key={team._id}
            className="bg-white shadow-md rounded-lg px-4 py-3 border border-gray-100 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleTeamClick(team._id)}
          >
            <span className="font-medium">{team.name}</span>
            <button
              onClick={(e) => handleDeleteTeam(team._id, e)}
              className="text-red-500 hover:text-red-700 text-2xl font-bold cursor-pointer px-2 hover:bg-red-100 rounded-full"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
