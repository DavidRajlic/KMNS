"use client";

import { useEffect, useState } from "react";

type Team = {
  _id: string;
  name: string;
  group?: string;
};

export default function GroupsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<
    "A" | "B" | "C" | "D" | null
  >(null);
  const [updatedTeams, setUpdatedTeams] = useState<Record<string, string>>({});

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

  const toggleTeamGroup = (teamId: string) => {
    if (!selectedGroup) return;

    setUpdatedTeams((prev) => ({
      ...prev,
      [teamId]: selectedGroup,
    }));
  };

  const confirmGroups = async () => {
    setLoading(true);
    try {
      for (const [teamId, group] of Object.entries(updatedTeams)) {
        await fetch(`http://localhost:4000/teams/${teamId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ group }),
        });
      }
      setUpdatedTeams({});
      await fetchTeams(); // reload updated teams
    } catch (err) {
      console.error("Napaka pri shranjevanju skupin:", err);
      setError("Napaka pri shranjevanju.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Razporeditev v skupine
      </h1>

      <div className="flex justify-center gap-2 mb-6">
        {["A", "B", "C", "D"].map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group as "A" | "B" | "C" | "D")}
            className={`px-4 py-2 rounded-md font-semibold cursor-pointer ${
              selectedGroup === group
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Skupina {group}
          </button>
        ))}
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <ul className=" grid grid-cols-2 gap-4  mb-4">
        {teams.map((team) => {
          const tempGroup = updatedTeams[team._id];
          const currentGroup = tempGroup || team.group;

          return (
            <li
              key={team._id}
              onClick={() => toggleTeamGroup(team._id)}
              className={`cursor-pointer px-4 py-3 rounded-lg border shadow-sm flex justify-between items-center transition ${
                tempGroup
                  ? "bg-green-100 border-green-300"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{team.name}</span>
              <span className="text-sm text-gray-500">
                {currentGroup ? `Skupina ${currentGroup}` : "Ni v skupini"}
              </span>
            </li>
          );
        })}
      </ul>

      <button
        onClick={confirmGroups}
        disabled={loading || Object.keys(updatedTeams).length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Shranjujem..." : "Potrdi skupine"}
      </button>
    </div>
  );
}
