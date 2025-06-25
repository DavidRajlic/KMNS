"use client";
import { useEffect, useState } from "react";

type Player = {
  _id: string;
  name: string;
  team_name: string;
  goals?: number;
};

export default function ScorersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch(`${API_URL}/players`);
      const data = await res.json();

      const sorted = data
        .filter((p: Player) => p.goals && p.goals > 0)
        .sort((a: Player, b: Player) => (b.goals ?? 0) - (a.goals ?? 0));

      setPlayers(sorted);
    };

    fetchPlayers();
  }, []);

  if (players.length === 0)
    return (
      <div className="min-h-screen bg-white text-center py-8 sm:py-12 px-4">
        <div className="text-4xl sm:text-6xl mb-4">⚽</div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          Ni še strelcev za prikaz
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Evidenca o strelcih se vodi v izločilnih bojih
        </p>
      </div>
    );

  let lastGoals = players[0].goals ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            LESTVICA STRELCEV
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-200 mx-auto rounded-full"></div>
        </div>

        {/* Table container */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-blue-200">
          <table className="min-w-full divide-y divide-blue-100 text-sm sm:text-base">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white uppercase tracking-wide text-xs sm:text-sm">
              <tr>
                <th className="py-3 px-2 text-center w-12 sm:w-16">#</th>
                <th className="py-3 px-2 text-left">Igralec</th>
                <th className="py-3 px-2 text-left">Ekipa</th>
                <th className="py-3 px-2 text-center text-sm sm:text-base">
                  ⚽
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => {
                let writeRank = false;
                if ((lastGoals ?? 0) > (player.goals ?? 0) || index === 0) {
                  writeRank = true;
                  lastGoals = player.goals ?? 0;
                }

                const currentRank = index + 1;

                return (
                  <tr
                    key={player._id}
                    className="transition-all hover:bg-blue-50 bg-blue-50"
                  >
                    <td className="py-3 px-2 text-center font-bold text-blue-800">
                      {writeRank ? currentRank : ""}
                    </td>
                    <td className="py-3 px-2 font-semibold text-blue-700 truncate">
                      {player.name}
                    </td>
                    <td className="py-3 px-2 text-blue-500 max-w-[110px]  truncate">
                      {player.team_name}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-blue-900">
                      {player.goals ?? 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
