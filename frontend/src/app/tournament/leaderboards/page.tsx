"use client";
import { useEffect, useState } from "react";

type Team = {
  _id: string;
  name: string;
  group: string;
  points: number;
  goals_diff: number;
  matches_played: number;
};

export default function LeaderboardsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Napaka pri nalaganju ekip:", err);
        setLoading(false);
      });
  }, []);

  // sort teams by groups
  const groups = teams.reduce<Record<string, Team[]>>((acc, team) => {
    if (!acc[team.group]) acc[team.group] = [];
    acc[team.group].push(team);
    return acc;
  }, {});

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-800 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDiffColor = (diff: number) => {
    if (diff > 0) return "text-green-600 font-semibold";
    if (diff < 0) return "text-red-600 font-semibold";
    return "text-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Nalagam lestvice...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 p-10 to-blue-800 bg-clip-text text-transparent mb-4">
            Lestvice skupinskega dela
          </h1>
        </div>

        <div className="sm:hidden mb-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
          <p className="text-sm text-blue-800 font-medium mb-2">📱 Krajšave:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>
              <strong>OT</strong> = Odigrane tekme
            </p>
            <p>
              <strong>RG</strong> = Razlika golov
            </p>
            <p>
              <strong>T</strong> = Točke
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {Object.entries(groups)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([groupName, groupTeams]) => (
              <div
                key={groupName}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Group header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
                    Skupina {groupName}
                  </h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <tr>
                        <th className="px-2 sm:px-3 py-3 text-left text-medium font-bold text-blue-800 uppercase tracking-wider">
                          <span> # </span>
                        </th>
                        <th className="px-2 sm:px-3 py-3 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">
                          Ekipa
                        </th>
                        <th className="px-2 sm:px-3 py-3 text-center text-xs font-bold text-blue-800 uppercase tracking-wider">
                          <span className="hidden sm:inline">
                            Odigrane Tekme
                          </span>
                          <span className="sm:hidden">OT</span>
                        </th>
                        <th className="px-2 sm:px-3 py-3 text-center text-xs font-bold text-blue-800 uppercase tracking-wider">
                          <span className="hidden sm:inline">
                            Razlika v zadetkih
                          </span>
                          <span className="sm:hidden">RG</span>
                        </th>
                        <th className="px-2 sm:px-3 py-3 text-center text-xs font-bold text-blue-800 uppercase tracking-wider">
                          <span className="hidden sm:inline">Točke</span>
                          <span className="sm:hidden">T</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {groupTeams
                        .sort(
                          (a, b) =>
                            b.points - a.points ||
                            b.goals_diff - a.goals_diff ||
                            a.name.localeCompare(b.name)
                        )
                        .map((team, i) => (
                          <tr
                            key={team._id}
                            className={`transition-colors duration-200 ${
                              i < 2 && team.matches_played > 2
                                ? "bg-green-50 hover:bg-green-100 border-l-4 border-green-400"
                                : "hover:bg-blue-50"
                            }`}
                          >
                            {/* Mesto */}
                            <td className="px-2 sm:px-3 py-3">
                              <div
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${getPositionStyle(
                                  i + 1
                                )}`}
                              >
                                {i + 1}
                              </div>
                            </td>

                            {/* Ekipa */}
                            <td className="px-2 sm:px-3 py-3">
                              <div className="font-semibold text-gray-900 text-sm sm:text-base">
                                {team.name}
                              </div>
                            </td>

                            {/* Tekme */}
                            <td className="px-2 sm:px-3 py-3 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                {team.matches_played}
                              </span>
                            </td>

                            {/* Razlika golov */}
                            <td className="px-2 sm:px-3 py-3 text-center">
                              <span
                                className={`font-bold text-sm ${getDiffColor(
                                  team.goals_diff
                                )}`}
                              >
                                {team.goals_diff > 0
                                  ? `+${team.goals_diff}`
                                  : team.goals_diff}
                              </span>
                            </td>

                            {/* Točke */}
                            <td className="px-2 sm:px-3 py-3 text-center">
                              <span className="inline-flex items-center justify-center w-10 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold text-sm sm:text-base">
                                {team.points}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>🏆 Lestvice se posodabljajo v realnem času</p>
        </div>
      </div>
    </div>
  );
}
