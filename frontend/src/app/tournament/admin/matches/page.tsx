"use client";

import { useEffect, useState } from "react";

type Team = {
  _id: string;
  name: string;
  group: string;
};

type Match = {
  _id: string;
  team1_id: string;
  team2_id: string;
  team1_name: string;
  team2_name: string;
  match_time_display: string;
  match_time_sort: number;
  stage: string;
  group: string;
};
type MatchStage = "skupine" | "četrfinale" | "polfinale" | "finale";

export default function CreateMatchPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [matchTime, setMatchTime] = useState("");
  const [stage, setStage] = useState<MatchStage>("skupine");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("");
  const [id, setId] = useState<string>("");

  const fetchTeams = async () => {
    const res = await fetch("http://localhost:4000/teams");
    const data = await res.json();
    setTeams(data);
  };

  const fetchMatches = async () => {
    const res = await fetch("http://localhost:4000/matches");
    const data = await res.json();
    const sorted = data.sort(
      (a: Match, b: Match) => a.match_time_sort - b.match_time_sort
    );
    setMatches(sorted);
  };

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);

  const handleTeamClick = (team: Team) => {
    setError(null);
    if (selectedTeams.find((t) => t._id === team._id)) return;
    if (selectedTeams.length < 2) setSelectedTeams([...selectedTeams, team]);
  };

  const deleteMatch = async (id: string) => {
    if (!confirm("Ali res želiš izbrisati to tekmo?")) return;
    try {
      const res = await fetch(`http://localhost:4000/matches/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Napaka pri brisanju tekme");
      setMatches((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
      alert("Napaka pri brisanju tekme");
    }
  };

  const handleEditMatch = (match: Match, id: string) => {
    setMatchTime(match.match_time_display);
    setStage(match.stage as MatchStage);
    setMode("edit");
    setId(id);
    createOrEditMatch();
  };

  const createOrEditMatch = async () => {
    if (selectedTeams.length !== 2 || !matchTime) return;

    if (
      selectedTeams[0].group !== selectedTeams[1].group &&
      stage === "skupine"
    ) {
      setError("Izbrani ekipi nista v isti skupini!");
      setSelectedTeams([]);
      setMatchTime("");
      setStage("skupine");
      fetchMatches();
      setId("");
      setMode("");
      return;
    }

    const [hours, minutes] = matchTime.split(":").map(Number);
    const match_time_numeric = hours * 100 + minutes;

    const group = stage === "skupine" ? selectedTeams[0].group : null;

    const match = {
      team1_id: selectedTeams[0]._id,
      team2_id: selectedTeams[1]._id,
      team1_name: selectedTeams[0].name,
      team2_name: selectedTeams[1].name,
      team1_goals: 0,
      team2_goals: 0,
      team1_scorers: [],
      stage,
      group,
      round: "",
      team1_players_yellow_card: [],
      match_status: "notPlayed",
      match_time_display: matchTime,
      match_time_sort: match_time_numeric,
    };

    if (mode === "edit") {
      await fetch(`http://localhost:4000/matches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(match),
      });
    } else {
      await fetch("http://localhost:4000/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(match),
      });
    }

    setSelectedTeams([]);
    setMatchTime("");
    setStage("skupine");
    fetchMatches();
    setId("");
    setMode("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Ustvari Tekmo
      </h1>

      {/* Ekipe */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {teams.map((team) => (
          <button
            key={team._id}
            className={`p-2 border rounded-lg text-center font-medium shadow hover:bg-blue-100 transition ${
              selectedTeams.find((t) => t._id === team._id)
                ? "bg-blue-200"
                : "bg-white"
            }`}
            onClick={() => handleTeamClick(team)}
            disabled={selectedTeams.length >= 2}
          >
            {team.name}
          </button>
        ))}
      </div>

      {/* Izbrani */}
      <div className="mb-4">
        <p className="font-semibold">Izbrani:</p>
        <p>
          {selectedTeams.map((t) => t.name).join(" vs ") || "Izberi 2 ekipi"}
        </p>
      </div>

      {/* Čas in stopnja */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="time"
          value={matchTime}
          onChange={(e) => setMatchTime(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value as MatchStage)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="skupine">Skupinski del</option>
          <option value="četrtfinale">Četrtfinale</option>
          <option value="polfinale">Polfinale</option>
          <option value="finale">Finale</option>
        </select>
        <button
          onClick={createOrEditMatch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Shrani tekmo
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* Tekme */}
      <h2 className="text-xl font-bold mt-8 mb-4 text-blue-800">Vse Tekme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {matches.map((match) => (
          <div
            key={match._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="font-semibold text-blue-800 mb-2">
              {match.team1_name} vs {match.team2_name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              Ura: {match.match_time_display}
            </p>
            {match.stage != "skupine" ? (
              <p className="text-sm text-gray-600 mb-2">Faza: {match.stage}</p>
            ) : (
              <p className="text-sm text-gray-600 mb-2">
                Faza: Skupina {match.group}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => deleteMatch(match._id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Izbriši
              </button>
              <button
                onClick={() => handleEditMatch(match, match._id)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Uredi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
